import { FunctionComponent, useEffect, useState } from 'react';
import { ButtonLink, DocsIcon16, EXTERNAL_LINKS, H1, H2, H3, Overlay, TgIcon } from 'src/shared';
import { Button, Flex, SlideFade, Text, useBreakpointValue } from '@chakra-ui/react';
import { tGUserStore } from 'src/entities';
import { observer } from 'mobx-react-lite';
import { TonApiPricing } from 'src/pages/landing/TonApiPricing';
import { Footer } from 'src/widgets';

const LandingPage: FunctionComponent = () => {
    const Heading = useBreakpointValue({
        md: H1,
        base: H2
    })!;

    const [isOpen, seIsOpen] = useState(false);
    useEffect(() => seIsOpen(true), []);

    return (
        <Overlay pt="0">
            <Flex align="center" direction="column" h="100%">
                <Flex
                    align="center"
                    justify="center"
                    direction="column"
                    flex="1"
                    maxW="648px"
                    mx="auto"
                    pt={{ base: 10, md: 18, lg: 8 }}
                    pb={{ base: 12, md: 15, lg: 8 }}
                    textAlign={{ base: 'start', md: 'center' }}
                >
                    <Heading mb="5">Connecting businesses to the TON ecosystem</Heading>
                    <Text textStyle="body1" mb={{ base: 8, md: 10 }} color="text.secondary">
                        Launch a successful business with TON blockchain: manage dapps, tokens and
                        payments in one place with powerful API and deep commercial integrations
                    </Text>
                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        gap="3"
                        w={{ base: '100%', md: 'auto' }}
                    >
                        <Button
                            isLoading={tGUserStore.isAuthProcess}
                            leftIcon={<TgIcon color="constant.white" />}
                            onClick={tGUserStore.login}
                            variant="primary"
                        >
                            Connect and try
                        </Button>
                        <ButtonLink
                            leftIcon={<DocsIcon16 />}
                            href={EXTERNAL_LINKS.DOCUMENTATION}
                            isExternal
                            variant="secondary"
                        >
                            Documentation
                        </ButtonLink>
                    </Flex>
                </Flex>
                <H3 mb="7">Pricing</H3>
                <SlideFade transition={{ enter: { duration: 0.5 } }} in={isOpen} offsetY="-10px">
                    <TonApiPricing
                        mb={{ base: 8, md: 14, lg: 16 }}
                        maxW={{ base: '648px', lg: 'unset' }}
                    />
                </SlideFade>
                <Footer gap="6" />
            </Flex>
        </Overlay>
    );
};

export default observer(LandingPage);
