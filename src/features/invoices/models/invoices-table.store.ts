import { makeAutoObservable, reaction } from 'mobx';
import {
    apiClient,
    createImmediateReaction,
    DTOGetInvoicesParamsFieldOrder,
    DTOGetInvoicesParamsTypeOrder,
    DTOInvoicesInvoice,
    DTOInvoiceStatus,
    Loadable,
    TonAddress,
    TonCurrencyAmount
} from 'src/shared';
import {
    Invoice,
    InvoiceCommon,
    InvoiceForm,
    InvoicesTablePagination,
    InvoiceStatus,
    InvoiceTableColumn,
    InvoiceTableSort,
    InvoiceTableSortColumn
} from './interfaces';
import { invoicesAppStore } from './invoices-app.store';

class InvoicesTableStore {
    invoices$ = new Loadable<Invoice[]>([]);

    private totalInvoices = 0;

    pageSize = 30;

    pagination: InvoicesTablePagination = {
        filter: {
            overpayment: false
        },
        sort: {
            direction: 'desc',
            column: 'creation-date'
        }
    };

    sortDirectionTouched = false;

    get hasNextPage(): boolean {
        return this.invoices$.value.length < this.totalInvoices;
    }

    get tableContentLength(): number {
        return this.hasNextPage ? this.invoices$.value.length + 1 : this.invoices$.value.length;
    }

    get isFilterEmpty(): boolean {
        return (
            !this.pagination.filter.status &&
            !this.pagination.filter.id &&
            !this.pagination.filter.overpayment
        );
    }

    constructor() {
        makeAutoObservable(this);

        let dispose: (() => void) | undefined;

        createImmediateReaction(
            () => invoicesAppStore.invoicesApp$.value,
            app => {
                dispose?.();
                this.clearState();
                this.loadFirstPageWithNewParams.cancelAllPendingCalls();
                this.loadNextPage.cancelAllPendingCalls();

                if (app) {
                    this.loadFirstPageWithNewParams();

                    dispose = reaction(
                        () => JSON.stringify(this.pagination),
                        () => {
                            this.loadFirstPageWithNewParams({ cancelPreviousCall: true });
                        }
                    );
                }
            }
        );
    }

    isItemLoaded = (index: number): boolean =>
        !this.hasNextPage || index < this.invoices$.value.length;

    loadFirstPageWithNewParams = this.invoices$.createAsyncAction(
        async () => {
            this.loadNextPage.cancelAllPendingCalls();

            const response = await this.fetchInvoices();

            const invoices = response.data.items.map(mapInvoiceDTOToInvoice);

            this.totalInvoices = response.data.count;
            return invoices;
        },
        { resetBeforeExecution: true }
    );

    loadNextPage = this.invoices$.createAsyncAction(async () => {
        const response = await this.fetchInvoices({ offset: this.invoices$.value.length });

        const invoices = response.data.items.map(mapInvoiceDTOToInvoice);

        this.totalInvoices = response.data.count;
        return this.invoices$.value.concat(invoices);
    });

    updateCurrentListSilently = this.invoices$.createAsyncAction(async () => {
        const response = await this.fetchInvoices();

        const invoices = response.data.items.map(mapInvoiceDTOToInvoice);

        this.totalInvoices = response.data.count;
        return invoices;
    });

    private async fetchInvoices(options?: {
        offset?: number;
        pageSize?: number;
    }): ReturnType<typeof apiClient.api.getInvoices> {
        const searchId = this.pagination.filter.id;
        let filterByStatus = undefined;

        if (this.pagination.filter.status?.length) {
            filterByStatus = this.pagination.filter.status.map(
                i => mapInvoiceStatusToInvoiceDTOStatus[i]
            );
        }

        const sortByColumn = mapSortColumnToFieldOrder[this.pagination.sort.column];
        const sortOrder =
            this.pagination.sort.direction === 'asc'
                ? DTOGetInvoicesParamsTypeOrder.DTOAsc
                : DTOGetInvoicesParamsTypeOrder.DTODesc;

        return apiClient.api.getInvoices({
            app_id: invoicesAppStore.invoicesApp$.value!.id,
            ...(options?.offset !== undefined && { offset: options.offset }),
            limit: options?.pageSize || this.pageSize,
            ...(searchId && { search_id: searchId }),
            field_order: sortByColumn,
            type_order: sortOrder,
            filter_status: filterByStatus,
            ...(this.pagination.filter.overpayment && { overpayment: true })
        });
    }

    createInvoice = this.invoices$.createAsyncAction(
        async (form: InvoiceForm) => {
            const result = await apiClient.api.createInvoicesInvoice(
                {
                    amount: form.amount.stringWeiAmount,
                    description: form.description,
                    life_time: form.lifeTimeSeconds
                },
                {
                    app_id: invoicesAppStore.invoicesApp$.value!.id
                }
            );

            await this.updateCurrentListSilently({ silently: true });

            return mapInvoiceDTOToInvoice(result.data);
        },
        {
            notMutateState: true,
            successToast: {
                title: 'Invoice created successfully'
            },
            errorToast: {
                title: 'Invoice creation error'
            }
        }
    );

    cancelInvoice = this.invoices$.createAsyncAction(
        async (id: Invoice['id']) => {
            await apiClient.api.cancelInvoicesInvoice(id, {
                app_id: invoicesAppStore.invoicesApp$.value!.id
            });
            await this.updateCurrentListSilently({ silently: true });
        },
        {
            successToast: {
                title: 'Invoice cancelled successfully'
            },
            errorToast: {
                title: 'Invoice cancellation error'
            }
        }
    );

    setFilterById = (value: string | undefined): void => {
        this.pagination.filter.id = value;
    };

    setSort = (sort: InvoiceTableSort): void => {
        this.sortDirectionTouched = true;
        this.pagination.sort = sort;
    };

    toggleSortDirection = (): void => {
        this.sortDirectionTouched = true;
        this.pagination.sort.direction = this.pagination.sort.direction === 'asc' ? 'desc' : 'asc';
    };

    setSortColumn = (column: InvoiceTableColumn): void => {
        this.sortDirectionTouched = true;
        this.pagination.sort.column = column;
        this.pagination.sort.direction = 'desc';
    };

    toggleFilterByStatus = (status: InvoiceStatus): void => {
        const statusActive = this.pagination.filter.status?.includes(status);
        if (statusActive) {
            this.pagination.filter.status = this.pagination.filter.status?.filter(
                i => i !== status
            );
        } else {
            this.pagination.filter.status = (this.pagination.filter.status || []).concat(status);
        }
    };

    toggleFilterByOverpayment = (): void => {
        this.pagination.filter.overpayment = !this.pagination.filter.overpayment;
    };

    clearFilterByStatus = (): void => {
        this.pagination.filter.status = undefined;
    };

    clearState(): void {
        this.invoices$.clear();
        this.pagination = {
            filter: {
                overpayment: false
            },
            sort: {
                direction: 'desc',
                column: 'creation-date'
            }
        };
        this.sortDirectionTouched = false;
    }
}

const mapInvoiceDTOStatusToInvoiceStatus: Record<DTOInvoicesInvoice['status'], InvoiceStatus> = {
    [DTOInvoiceStatus.DTOPaid]: 'success',
    [DTOInvoiceStatus.DTOPending]: 'pending',
    [DTOInvoiceStatus.DTOExpired]: 'expired',
    [DTOInvoiceStatus.DTOCancelled]: 'cancelled'
};

const mapInvoiceStatusToInvoiceDTOStatus: Record<InvoiceStatus, DTOInvoicesInvoice['status']> =
    Object.fromEntries(Object.entries(mapInvoiceDTOStatusToInvoiceStatus).map(a => a.reverse()));

function mapInvoiceDTOToInvoice(invoiceDTO: DTOInvoicesInvoice): Invoice {
    const commonInvoice: InvoiceCommon = {
        amount: new TonCurrencyAmount(invoiceDTO.amount),
        creationDate: new Date(invoiceDTO.date_create * 1000),
        id: invoiceDTO.id,
        validUntil: new Date(invoiceDTO.date_expire * 1000),
        description: invoiceDTO.description,
        payTo: TonAddress.parse(invoiceDTO.pay_to_address),
        paymentLink: invoiceDTO.payment_link,
        overpayment:
            invoiceDTO.overpayment && Number(invoiceDTO.overpayment) !== 0
                ? new TonCurrencyAmount(invoiceDTO.overpayment)
                : undefined
    };

    const status = mapInvoiceDTOStatusToInvoiceStatus[invoiceDTO.status];

    if (status === 'success') {
        return {
            ...commonInvoice,
            paidBy: TonAddress.parse(invoiceDTO.paid_by_address!),
            paymentDate: new Date(invoiceDTO.date_change * 1000),
            status
        };
    }

    if (status === 'cancelled') {
        return {
            ...commonInvoice,
            status,
            cancellationDate: new Date(invoiceDTO.date_change * 1000)
        };
    }

    return { ...commonInvoice, status };
}

const mapSortColumnToFieldOrder: Record<InvoiceTableSortColumn, DTOGetInvoicesParamsFieldOrder> = {
    id: DTOGetInvoicesParamsFieldOrder.DTOId,
    description: DTOGetInvoicesParamsFieldOrder.DTODescription,
    amount: DTOGetInvoicesParamsFieldOrder.DTOAmount,
    status: DTOGetInvoicesParamsFieldOrder.DTOStatus,
    'creation-date': DTOGetInvoicesParamsFieldOrder.DTODateCreate
};

export const invoicesTableStore = new InvoicesTableStore();