import { forwardRef, Icon } from '@chakra-ui/react';
import { ComponentProps } from 'react';

export const EmptyFolderIcon48 = forwardRef<ComponentProps<typeof Icon>, typeof Icon>(
    (props, ref) => {
        return (
            <Icon
                ref={ref}
                w="48px"
                h="48px"
                color="icon.teritary"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M41.7817 6.71967C42.0746 7.01256 42.0746 7.48744 41.7817 7.78033L40.0617 9.50026L41.7816 11.2196C42.0745 11.5124 42.0746 11.9873 41.7818 12.2803C41.4889 12.5732 41.014 12.5733 40.7211 12.2804L39.0011 10.5609L37.2817 12.2803C36.9888 12.5732 36.5139 12.5732 36.221 12.2803C35.9281 11.9874 35.9281 11.5126 36.221 11.2197L37.9404 9.50026L36.2209 7.78025C35.9281 7.48731 35.9282 7.01244 36.2211 6.71959C36.514 6.42674 36.9889 6.42681 37.2818 6.71975L39.0011 8.4396L40.721 6.71967C41.0139 6.42678 41.4888 6.42678 41.7817 6.71967ZM15.2306 13.0673C15.0187 13.0068 14.7768 13 14 13H9.54999C8.69753 13 8.1033 13.0006 7.64067 13.0384C7.18679 13.0755 6.92602 13.1446 6.72851 13.2452C6.30514 13.461 5.96094 13.8052 5.74522 14.2285C5.64458 14.426 5.57545 14.6868 5.53837 15.1407C5.50057 15.6033 5.49999 16.1975 5.49999 17.05V32.633L7.31787 27.331L7.37058 27.1772C7.85274 25.7697 8.16263 24.865 8.74162 24.1811C9.25183 23.5783 9.90428 23.1123 10.6399 22.8251C11.4747 22.4993 12.431 22.4996 13.9188 22.5L14.0814 22.5H37.5V21.05C37.5 20.1975 37.4994 19.6033 37.4616 19.1407C37.4245 18.6868 37.3554 18.426 37.2547 18.2285C37.039 17.8052 36.6948 17.461 36.2715 17.2452C36.0739 17.1446 35.8132 17.0755 35.3593 17.0384C34.8967 17.0006 34.3024 17 33.45 17H21L20.9035 17C20.2637 17.0003 19.7969 17.0006 19.3575 16.8751C18.97 16.7644 18.6065 16.5826 18.2854 16.339C17.9214 16.0628 17.6415 15.6892 17.2579 15.1772L17.2 15.1L16.6 14.3C16.1339 13.6786 15.9833 13.4891 15.8078 13.3559C15.635 13.2247 15.4392 13.1269 15.2306 13.0673ZM39 22.5068V21.05V21.0179V21.0178V21.0177C39 20.205 39 19.5494 38.9566 19.0185C38.912 18.4719 38.8176 17.9918 38.5913 17.5475C38.2317 16.8419 37.6581 16.2683 36.9524 15.9087C36.5082 15.6824 36.0281 15.588 35.4815 15.5434C34.9505 15.5 34.2949 15.5 33.4821 15.5H33.45H21C20.2232 15.5 19.9813 15.4932 19.7694 15.4327C19.5608 15.3731 19.365 15.2753 19.1922 15.1441C19.0166 15.0109 18.8661 14.8214 18.4 14.2L17.8 13.4L17.7421 13.3228L17.7421 13.3228L17.7421 13.3228C17.3585 12.8108 17.0786 12.4372 16.7145 12.161C16.3935 11.9174 16.03 11.7356 15.6425 11.6249C15.2031 11.4994 14.7362 11.4997 14.0965 11.5L14 11.5H9.54999H9.51788C8.70504 11.5 8.04943 11.5 7.51852 11.5434C6.97188 11.588 6.49174 11.6824 6.04752 11.9087C5.34191 12.2683 4.76824 12.8419 4.40871 13.5475C4.18237 13.9918 4.08801 14.4719 4.04335 15.0185C3.99997 15.5494 3.99998 16.2051 3.99999 17.0179L3.99999 17.05V37.6571C3.97266 37.9956 3.98899 38.3215 4.06731 38.6415C4.29604 39.5761 4.87525 40.387 5.68514 40.9065C6.20554 41.2403 6.8162 41.3742 7.52041 41.4376C8.21323 41.5 9.09093 41.5 10.1923 41.5H10.1924H10.2298H33.679L33.8416 41.5C35.3294 41.5004 36.2857 41.5007 37.1205 41.1749C37.8561 40.8877 38.5086 40.4217 39.0188 39.8189C39.5978 39.1349 39.9077 38.2303 40.3898 36.8227L40.4425 36.6689L42.7804 29.85L42.7926 29.8145C43.1498 28.7727 43.4345 27.9424 43.6001 27.2668C43.7686 26.5801 43.8399 25.959 43.6929 25.3585C43.4642 24.4239 42.885 23.613 42.0751 23.0935C41.5547 22.7597 40.944 22.6258 40.2398 22.5624C39.8786 22.5299 39.4672 22.5143 39 22.5068ZM5.4882 38C5.49104 38.1085 5.50389 38.2015 5.5243 38.2849C5.66154 38.8456 6.00907 39.3322 6.495 39.6439C6.71486 39.7849 7.04092 39.8884 7.65494 39.9437C8.27251 39.9993 9.08252 40 10.2298 40H33.679C35.3872 40 36.0369 39.9876 36.575 39.7775C37.0784 39.5811 37.5248 39.2622 37.8739 38.8498C38.2471 38.4089 38.4696 37.7983 39.0236 36.1824L41.3615 29.3635C41.7336 28.2782 41.9956 27.5118 42.1433 26.9096C42.2901 26.3108 42.298 25.9688 42.2359 25.7151C42.0987 25.1544 41.7511 24.6678 41.2652 24.3561C41.0454 24.2151 40.7193 24.1116 40.1053 24.0563C39.4877 24.0007 38.6777 24 37.5304 24H14.0814C12.3731 24 11.7235 24.0124 11.1853 24.2225C10.682 24.4189 10.2356 24.7378 9.8865 25.1502C9.51329 25.5911 9.29082 26.2016 8.73678 27.8175L6.39877 34.6364C6.02665 35.7217 5.76462 36.4882 5.61693 37.0904C5.55485 37.3435 5.5176 37.5508 5.49999 37.7249V38H5.4882Z"
                    fill="currentColor"
                />
            </Icon>
        );
    }
);

EmptyFolderIcon48.displayName = 'EmptyFolderIcon48';