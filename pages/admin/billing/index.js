// Chakra imports
import { Box, Flex, Grid, Icon } from '@chakra-ui/react'
// Assets
// import BackgroundCard1 from "/assets/img/BackgroundCard1.png";
// import { MastercardIcon, VisaIcon } from "../../../components/Icons/Icons";
import React from 'react'
import { FaPaypal, FaWallet } from 'react-icons/fa'
import { RiMastercardFill } from 'react-icons/ri'
// import {
//   invoicesData,
// } from "../../../variables/general";
// import BillingInformation from "./components/BillingInformation";
import CreditCard from '/components/Admin/Billing/components/CreditCard'
import Invoices from '/components/Admin/Billing/components/Invoices'
// import PaymentMethod from "./components/PaymentMethod";
import PaymentStatistics from '/components/Admin/Billing/components/PaymentStatistics'
// import Transactions from "./components/Transactions";

function Billing() {
    const [data, setData] = React.useState()

    React.useEffect(() => {
        async function fetchApi() {
            const res = await (await fetch('/api/general')).json()
            setData(res.invoicesData)
        }
        fetchApi()
    }, [])

    return (
        <Flex
            // direction='column'
            // overflow="visible"
            // pt={{ base: "120px", md: "75px" }}
            px="11"
        >
            <Box>
                <Grid templateColumns={{ sm: '1fr', lg: '1fr' }} templateRows="1.2fr 2fr">
                    <Box>
                        <Grid
                            templateColumns={{
                                sm: '1fr',
                                md: '1fr 1fr 1fr 1fr',
                                xl: '1fr 1fr 1fr 1fr',
                            }}
                            templateRows={{ sm: 'auto auto auto', md: '1fr auto', xl: '1fr' }}
                            gap="26px"
                        >
                            <CreditCard
                                backgroundImage="/assets/img/BackgroundCard1.png"
                                title={' SIL VISSER COACHING'}
                                number={'Platinum program'}
                                validity={{
                                    name: 'active ☑️',
                                    data: '05/24',
                                }}
                                cvv={{
                                    name: '01-01-2020',
                                    code: '01-11-2022',
                                }}
                                icon={
                                    <Icon
                                        as={RiMastercardFill}
                                        w="48px"
                                        h="auto"
                                        color="gray.400"
                                    />
                                }
                            />
                            <PaymentStatistics
                                icon={<Icon h={'24px'} w={'24px'} color="white" as={FaWallet} />}
                                title={'Training'}
                                description={'3 times weekly'}
                                amount={500}
                                key="1"
                            />
                            <PaymentStatistics
                                icon={<Icon h={'24px'} w={'24px'} color="white" as={FaPaypal} />}
                                title={'Nutrition'}
                                description={'Full nutrition plan'}
                                amount={300}
                                key="2"
                            />
                        </Grid>
                        {/* <PaymentMethod
            title={"Payment Method"}
            mastercard={{
              icon: <MastercardIcon w='100%' h='100%' />,
              number: "7812 2139 0823 XXXX",
            }}
            visa={{
              icon: <VisaIcon w='100%' h='100%' />,
              number: "7812 2139 0823 XXXX",
            }}
          /> */}
                    </Box>
                    <Box>{data && <Invoices title={'Invoices'} data={data} />}</Box>
                </Grid>
                {/* <Grid templateColumns={{ sm: "1fr", lg: "1.6fr 1.2fr" }}>
        <BillingInformation title={"Billing Information"} data={billingData} />
      </Grid> */}
            </Box>
        </Flex>
    )
}

export default Billing
