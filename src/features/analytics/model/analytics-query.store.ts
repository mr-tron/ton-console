import { makeAutoObservable } from 'mobx';
import {
    apiClient,
    createReaction,
    DTOStatsQueryResult,
    DTOStatsQueryStatus,
    Loadable,
    TonCurrencyAmount
} from 'src/shared';
import { AnalyticsQuery, AnalyticsTableSource, AnalyticsTablesSchema } from './interfaces';
import { projectsStore } from 'src/entities';
import { analyticsGPTGenerationStore, analyticsHistoryTableStore } from 'src/features';

class AnalyticsQueryStore {
    query$ = new Loadable<AnalyticsQuery | null>(null);

    tablesSchema$ = new Loadable<AnalyticsTablesSchema | undefined>(undefined);

    constructor() {
        makeAutoObservable(this);

        createReaction(
            () => projectsStore.selectedProject?.id,
            (_, prevId) => {
                if (prevId) {
                    this.clear();
                }
            }
        );
    }

    public fetchAllTablesSchema = this.tablesSchema$.createAsyncAction(
        async () => {
            if (!this.tablesSchema$.value) {
                const result = await apiClient.api.getStatsDdl();
                return parseDDL(result.data as unknown as string);
            }
        },
        { resetBeforeExecution: true }
    );

    createQuery = this.query$.createAsyncAction(
        async (query: string) => {
            const result = await apiClient.api.sendQueryToStats({
                project_id: projectsStore.selectedProject!.id,
                query,
                ...(query.trim() === analyticsGPTGenerationStore.generatedSQL$.value?.trim() && {
                    gpt_message: analyticsGPTGenerationStore.gptPrompt
                })
            });

            await analyticsHistoryTableStore.fetchPaymentsHistory();

            return mapDTOStatsSqlResultToAnalyticsQuery(result.data);
        },
        {
            errorToast: e => ({
                title: 'Error',
                description: (e as { response: { data: { error: string } } }).response.data.error
            })
        }
    );

    refetchQuery = this.query$.createAsyncAction(async () => {
        const result = await apiClient.api.getSqlResultFromStats(this.query$.value!.id);

        return mapDTOStatsSqlResultToAnalyticsQuery(result.data);
    });

    loadQuery = this.query$.createAsyncAction(
        async (id: string) => {
            const result = await apiClient.api.getSqlResultFromStats(id);
            return mapDTOStatsSqlResultToAnalyticsQuery(result.data);
        },
        { resetBeforeExecution: true }
    );

    clear(): void {
        this.query$.clear();
    }
}

export function mapDTOStatsSqlResultToAnalyticsQuery(value: DTOStatsQueryResult): AnalyticsQuery {
    const basicQuery = {
        type: 'query',
        id: value.id,
        creationDate: new Date(value.date_create),
        gptPrompt: value.query?.gpt_message,
        request: value.query!.sql!,
        estimatedTimeMS: value.estimate!.approximate_time,
        estimatedCost: new TonCurrencyAmount(value.estimate!.approximate_cost)
    } as const;

    if (value.status === DTOStatsQueryStatus.DTOExecuting) {
        return {
            ...basicQuery,
            status: 'executing'
        };
    }

    if (value.status === DTOStatsQueryStatus.DTOSuccess) {
        return {
            ...basicQuery,
            status: 'success',
            cost: new TonCurrencyAmount(value.cost!),
            spentTimeMS: value.spent_time!,
            csvUrl: value.url!,
            preview: parsePreview(value.preview!, !!value.all_data_in_preview)
        };
    }

    return {
        ...basicQuery,
        status: 'error',
        cost: new TonCurrencyAmount(value.cost!),
        spentTimeMS: value.spent_time!,
        errorReason: value.error!
    };
}

function parsePreview(value: string[][], isAllDataPresented: boolean): AnalyticsTableSource {
    if (!value)
        return {
            headings: [],
            data: [],
            isAllDataPresented: true
        };

    const headings = value[0];
    const data = value.slice(1);
    return { headings, data, isAllDataPresented };
}

function parseDDL(ddl: string): AnalyticsTablesSchema {
    const tableRegex = /create table ([\w\.]+)\s*\(([\S\s]*?)\);/g;
    const propertiesRegex = /(\s*([a-zA-Z0-9_]+) [^,]*,)/g;

    const groups = Array.from(ddl.matchAll(tableRegex));

    return groups.reduce((acc, group) => {
        const name = group[1];
        const properties = (group[2] + ',').matchAll(propertiesRegex);
        acc[name] = Array.from(properties).map(match => match[2]);
        return acc;
    }, {} as AnalyticsTablesSchema);
}

export const analyticsQueryStore = new AnalyticsQueryStore();