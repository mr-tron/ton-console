import { forwardRef, Icon } from '@chakra-ui/react';
import { ComponentProps } from 'react';

export const NftIcon24 = forwardRef<ComponentProps<typeof Icon>, typeof Icon>((props, ref) => {
    return (
        <Icon
            ref={ref}
            w="24px"
            h="24px"
            color="icon.primary"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.332 4.75L8.66882 4.75C8.21727 4.75 7.80083 4.99353 7.57941 5.38706L4.20356 11.3871C3.98944 11.7676 3.98944 12.2324 4.20357 12.6129L7.57941 18.6129C7.80083 19.0065 8.21727 19.25 8.66882 19.25H15.332C15.7835 19.25 16.2 19.0065 16.4214 18.6129L19.7972 12.6129C20.0113 12.2324 20.0113 11.7676 19.7972 11.3871L16.4214 5.38706C16.2 4.99353 15.7835 4.75 15.332 4.75ZM8.66882 3.25H15.332C16.3254 3.25 17.2415 3.78576 17.7287 4.65152L21.1045 10.6515C21.5756 11.4888 21.5756 12.5112 21.1045 13.3485L17.7287 19.3485C17.2415 20.2142 16.3254 20.75 15.332 20.75H8.66882C7.67542 20.75 6.75924 20.2142 6.27213 19.3485L2.89628 13.3485C2.4252 12.5112 2.4252 11.4888 2.89628 10.6515L6.27213 4.65153C6.75924 3.78576 7.67542 3.25 8.66882 3.25ZM8.64349 10.281C9.00221 10.0739 9.46091 10.1968 9.66801 10.5555L12.168 14.8857C12.3751 15.2444 12.2522 15.7031 11.8935 15.9102C11.5348 16.1173 11.0761 15.9944 10.869 15.6357L8.36897 11.3055C8.16187 10.9468 8.28477 10.4881 8.64349 10.281ZM13.1321 8.55554C12.925 8.19682 12.4663 8.07392 12.1076 8.28102C11.7489 8.48813 11.626 8.94682 11.8331 9.30554L14.3331 13.6357C14.5402 13.9944 14.9989 14.1173 15.3576 13.9102C15.7163 13.7031 15.8392 13.2444 15.6321 12.8857L13.1321 8.55554Z"
                fill="currentColor"
            />
        </Icon>
    );
});

NftIcon24.displayName = 'NftIcon24';