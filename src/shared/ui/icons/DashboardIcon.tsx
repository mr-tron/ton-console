import { Icon } from '@chakra-ui/react';
import { ComponentProps, FunctionComponent } from 'react';

export const DashboardIcon: FunctionComponent<ComponentProps<typeof Icon>> = props => {
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
                d="M2 6C2 4.59987 2 3.8998 2.27248 3.36502C2.51217 2.89462 2.89462 2.51217 3.36502 2.27248C3.8998 2 4.59987 2 6 2H7.25C8.65013 2 9.3502 2 9.88498 2.27248C10.3554 2.51217 10.7378 2.89462 10.9775 3.36502C11.25 3.8998 11.25 4.59987 11.25 6V7.25C11.25 8.65013 11.25 9.3502 10.9775 9.88498C10.7378 10.3554 10.3554 10.7378 9.88498 10.9775C9.3502 11.25 8.65013 11.25 7.25 11.25H6C4.59987 11.25 3.8998 11.25 3.36502 10.9775C2.89462 10.7378 2.51217 10.3554 2.27248 9.88498C2 9.3502 2 8.65013 2 7.25V6ZM3.5 5.1C3.5 4.53995 3.5 4.25992 3.60899 4.04601C3.70487 3.85785 3.85785 3.70487 4.04601 3.60899C4.25992 3.5 4.53995 3.5 5.1 3.5H8.15C8.71005 3.5 8.99008 3.5 9.20399 3.60899C9.39215 3.70487 9.54513 3.85785 9.64101 4.04601C9.75 4.25992 9.75 4.53995 9.75 5.1V8.15C9.75 8.71005 9.75 8.99008 9.64101 9.20399C9.54513 9.39215 9.39215 9.54513 9.20399 9.64101C8.99008 9.75 8.71005 9.75 8.15 9.75H5.1C4.53995 9.75 4.25992 9.75 4.04601 9.64101C3.85785 9.54513 3.70487 9.39215 3.60899 9.20399C3.5 8.99008 3.5 8.71005 3.5 8.15V5.1ZM2 16.75C2 15.3499 2 14.6498 2.27248 14.115C2.51217 13.6446 2.89462 13.2622 3.36502 13.0225C3.8998 12.75 4.59987 12.75 6 12.75H7.25C8.65013 12.75 9.3502 12.75 9.88498 13.0225C10.3554 13.2622 10.7378 13.6446 10.9775 14.115C11.25 14.6498 11.25 15.3499 11.25 16.75V18C11.25 19.4001 11.25 20.1002 10.9775 20.635C10.7378 21.1054 10.3554 21.4878 9.88498 21.7275C9.3502 22 8.65013 22 7.25 22H6C4.59987 22 3.8998 22 3.36502 21.7275C2.89462 21.4878 2.51217 21.1054 2.27248 20.635C2 20.1002 2 19.4001 2 18V16.75ZM3.5 15.85C3.5 15.2899 3.5 15.0099 3.60899 14.796C3.70487 14.6078 3.85785 14.4549 4.04601 14.359C4.25992 14.25 4.53995 14.25 5.1 14.25H8.15C8.71005 14.25 8.99008 14.25 9.20399 14.359C9.39215 14.4549 9.54513 14.6078 9.64101 14.796C9.75 15.0099 9.75 15.2899 9.75 15.85V18.9C9.75 19.4601 9.75 19.7401 9.64101 19.954C9.54513 20.1422 9.39215 20.2951 9.20399 20.391C8.99008 20.5 8.71005 20.5 8.15 20.5H5.1C4.53995 20.5 4.25992 20.5 4.04601 20.391C3.85785 20.2951 3.70487 20.1422 3.60899 19.954C3.5 19.7401 3.5 19.4601 3.5 18.9V15.85ZM13.0225 3.36502C12.75 3.8998 12.75 4.59987 12.75 6V7.25C12.75 8.65013 12.75 9.3502 13.0225 9.88498C13.2622 10.3554 13.6446 10.7378 14.115 10.9775C14.6498 11.25 15.3499 11.25 16.75 11.25H18C19.4001 11.25 20.1002 11.25 20.635 10.9775C21.1054 10.7378 21.4878 10.3554 21.7275 9.88498C22 9.3502 22 8.65013 22 7.25V6C22 4.59987 22 3.8998 21.7275 3.36502C21.4878 2.89462 21.1054 2.51217 20.635 2.27248C20.1002 2 19.4001 2 18 2H16.75C15.3499 2 14.6498 2 14.115 2.27248C13.6446 2.51217 13.2622 2.89462 13.0225 3.36502ZM14.359 4.04601C14.25 4.25992 14.25 4.53995 14.25 5.1V8.15C14.25 8.71005 14.25 8.99008 14.359 9.20399C14.4549 9.39215 14.6078 9.54513 14.796 9.64101C15.0099 9.75 15.2899 9.75 15.85 9.75H18.9C19.4601 9.75 19.7401 9.75 19.954 9.64101C20.1422 9.54513 20.2951 9.39215 20.391 9.20399C20.5 8.99008 20.5 8.71005 20.5 8.15V5.1C20.5 4.53995 20.5 4.25992 20.391 4.04601C20.2951 3.85785 20.1422 3.70487 19.954 3.60899C19.7401 3.5 19.4601 3.5 18.9 3.5H15.85C15.2899 3.5 15.0099 3.5 14.796 3.60899C14.6078 3.70487 14.4549 3.85785 14.359 4.04601ZM12.75 16.75C12.75 15.3499 12.75 14.6498 13.0225 14.115C13.2622 13.6446 13.6446 13.2622 14.115 13.0225C14.6498 12.75 15.3499 12.75 16.75 12.75H18C19.4001 12.75 20.1002 12.75 20.635 13.0225C21.1054 13.2622 21.4878 13.6446 21.7275 14.115C22 14.6498 22 15.3499 22 16.75V18C22 19.4001 22 20.1002 21.7275 20.635C21.4878 21.1054 21.1054 21.4878 20.635 21.7275C20.1002 22 19.4001 22 18 22H16.75C15.3499 22 14.6498 22 14.115 21.7275C13.6446 21.4878 13.2622 21.1054 13.0225 20.635C12.75 20.1002 12.75 19.4001 12.75 18V16.75ZM14.25 15.85C14.25 15.2899 14.25 15.0099 14.359 14.796C14.4549 14.6078 14.6078 14.4549 14.796 14.359C15.0099 14.25 15.2899 14.25 15.85 14.25H18.9C19.4601 14.25 19.7401 14.25 19.954 14.359C20.1422 14.4549 20.2951 14.6078 20.391 14.796C20.5 15.0099 20.5 15.2899 20.5 15.85V18.9C20.5 19.4601 20.5 19.7401 20.391 19.954C20.2951 20.1422 20.1422 20.2951 19.954 20.391C19.7401 20.5 19.4601 20.5 18.9 20.5H15.85C15.2899 20.5 15.0099 20.5 14.796 20.391C14.6078 20.2951 14.4549 20.1422 14.359 19.954C14.25 19.7401 14.25 19.4601 14.25 18.9V15.85Z"
                fill="black"
            />
        </Icon>
    );
};