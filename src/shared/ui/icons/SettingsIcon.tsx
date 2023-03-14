import { Icon } from '@chakra-ui/react';
import { ComponentProps, FunctionComponent } from 'react';

export const SettingsIcon: FunctionComponent<ComponentProps<typeof Icon>> = props => {
    return (
        <Icon
            w="24px"
            h="24px"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.75 6C6.75 5.17157 7.42157 4.5 8.25 4.5C9.07843 4.5 9.75 5.17157 9.75 6C9.75 6.82843 9.07843 7.5 8.25 7.5C7.42157 7.5 6.75 6.82843 6.75 6ZM5.34451 5.25H3.75C3.33579 5.25 3 5.58579 3 6C3 6.41421 3.33579 6.75 3.75 6.75H5.34451C5.67755 8.04392 6.85212 9 8.25 9C9.64788 9 10.8225 8.04392 11.1555 6.75H20.25C20.6642 6.75 21 6.41421 21 6C21 5.58579 20.6642 5.25 20.25 5.25H11.1555C10.8225 3.95608 9.64788 3 8.25 3C6.85212 3 5.67755 3.95608 5.34451 5.25ZM3.75 17.25C3.33579 17.25 3 17.5858 3 18C3 18.4142 3.33579 18.75 3.75 18.75H5.34451C5.67755 20.0439 6.85212 21 8.25 21C9.64788 21 10.8225 20.0439 11.1555 18.75H20.25C20.6642 18.75 21 18.4142 21 18C21 17.5858 20.6642 17.25 20.25 17.25H11.1555C10.8225 15.9561 9.64788 15 8.25 15C6.85212 15 5.67755 15.9561 5.34451 17.25H3.75ZM8.25 16.5C9.07843 16.5 9.75 17.1716 9.75 18C9.75 18.8284 9.07843 19.5 8.25 19.5C7.42157 19.5 6.75 18.8284 6.75 18C6.75 17.1716 7.42157 16.5 8.25 16.5ZM3 12C3 11.5858 3.33579 11.25 3.75 11.25H12.8445C13.1775 9.95608 14.3521 9 15.75 9C17.1479 9 18.3225 9.95608 18.6555 11.25H20.25C20.6642 11.25 21 11.5858 21 12C21 12.4142 20.6642 12.75 20.25 12.75H18.6555C18.3225 14.0439 17.1479 15 15.75 15C14.3521 15 13.1775 14.0439 12.8445 12.75H3.75C3.33579 12.75 3 12.4142 3 12ZM17.25 12C17.25 11.1716 16.5784 10.5 15.75 10.5C14.9216 10.5 14.25 11.1716 14.25 12C14.25 12.8284 14.9216 13.5 15.75 13.5C16.5784 13.5 17.25 12.8284 17.25 12Z"
                fill="black"
            />
        </Icon>
    );
};
