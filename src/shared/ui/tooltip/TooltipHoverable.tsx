import {
    cloneElement,
    ComponentProps,
    FunctionComponent,
    isValidElement,
    PropsWithChildren,
    ReactElement,
    useEffect,
    useMemo,
    useState
} from 'react';
import {
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    useDisclosure
} from '@chakra-ui/react';
import { useIsTextTruncated } from 'src/shared';

const defaultModifiers = [
    {
        name: 'preventOverflow',
        options: {
            padding: 8
        }
    }
];

export const TooltipHoverable: FunctionComponent<
    PropsWithChildren<
        {
            host: ReactElement | string;
            canBeShown?: boolean;
        } & ComponentProps<typeof Popover>
    >
> = ({ host, canBeShown, children, ...rest }) => {
    const { ref, isTruncated } = useIsTextTruncated();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isOpenDebounced, setIsOpenDebounced] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsOpenDebounced(isOpen);
            return;
        }

        const timer = setTimeout(() => setIsOpenDebounced(isOpen), 200);
        return () => {
            clearTimeout(timer);
        };
    }, [isOpen]);

    const hostWithRef = useMemo(() => {
        const element = isValidElement(host) ? host : <span>{host}</span>;

        return cloneElement(element, {
            ref
        });
    }, [host, ref]);

    const hostWithTrigger = useMemo(() => {
        return cloneElement(hostWithRef, {
            onMouseLeave: onClose,
            onMouseEnter: onOpen
        });
    }, [hostWithRef, onOpen, onClose]);

    if (canBeShown === false) {
        return <>{host}</>;
    }

    return isTruncated || canBeShown ? (
        <Popover autoFocus={false} isOpen={isOpenDebounced} modifiers={defaultModifiers} {...rest}>
            <PopoverTrigger>{hostWithTrigger}</PopoverTrigger>
            <PopoverContent
                w="inherit"
                minW="unset"
                maxW="100%"
                px="4"
                py="3"
                border="none"
                borderRadius="lg"
                whiteSpace="normal"
                filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.04)) drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.12))"
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
            >
                {children}
                <PopoverArrow />
            </PopoverContent>
        </Popover>
    ) : (
        hostWithRef
    );
};