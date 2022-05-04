// Chakra imports
import { Box, Flex, Grid, Image, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import BarChart from '../../../components/Charts/BarChart'
import LineChart from '../../../components/Charts/LineChart'

import React, { useEffect, useState, useRef } from 'react'
import ActiveUsers from './components/ActiveUsers'
import SalesOverview from './components/SalesOverview'
import D3Chart from '../../../components/D3/circle'
import { Sunburst } from '../../../components/D3/sunburst'
import { data } from './data'
import { flairData } from './flareData'
// import Sunreact from '../../../components/D3/sunreact'
import dynamic from 'next/dynamic'

const D3Dynamic = dynamic(() => import('../../../components/D3/sunreact'), { ssr: false })

export default function Dashboard() {
	const iconBoxInside = useColorModeValue('white', 'white')
	const boxref = useRef()
	const [cardWidth, setCardWidth] = useState();

	useEffect(() => {

		function handleResizeEvent() {
			let resizeTimer;
			const handleResize = () => {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function () {
					console.log("BOX", boxref.current.clientWidth)
					setCardWidth(boxref.current.clientWidth);
					// setHeight(boxref.current.clientHeight);
				}, 300);
			};
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
		handleResizeEvent()
		// boxref.current && setCardWidth(boxref.current.clientWidth);
		console.log('Size', boxref.current.clientWidth)
	})

	return (
		<Flex
			flexDirection="column"
		// pt={{ base: "120px", md: "75px" }}
		>
			{/* <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        <MiniStatistics
          title={"Today's Moneys"}
          amount={"$53,000"}
          percentage={55}
          icon={<WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Today's Users"}
          amount={"2,300"}
          percentage={5}
          icon={<GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"New Clients"}
          amount={"+3,020"}
          percentage={-14}
          icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"Total Sales"}
          amount={"$173,000"}
          percentage={8}
          icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
        />
      </SimpleGrid> */}
			{/* <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my='26px'
        gap='24px'>
        <BuiltByDevelopers
          title={"Built by Developers"}
          name={"Purity UI Dashboard"}
          description={
            "From colors, cards, typography to complex elements, you will find the full documentation."
          }
          image={
            <Image
              src={logoChakra}
              alt='chakra image'
              minWidth={{ md: "300px", lg: "auto" }}
            />
          }
        />
        <WorkWithTheRockets
          backgroundImage={peopleImage}
          title={"Work with the rockets"}
          description={
            "Wealth creation is a revolutionary recent positive-sum game. It is all about who takes the opportunity first."
          }
        />
      </Grid> */}
			<Grid
				templateColumns={{ sm: '1fr', lg: '1.3fr 1.7fr' }}
				templateRows={{ sm: 'repeat(2, 1fr)', lg: '1fr' }}
				gap="11"
				mb={{ lg: '26px' }}
			>
				{/* <ActiveUsers title={'Big4 Lifts'} percentage={6} chart={<BarChart />} />
                <SalesOverview
                    title={'Weight & Body Fat %'}
                    percentage={11}
                    chart={<LineChart />}
                /> */}
				{/* <Sunburst data={flairData} /> */}
				{/* <D3Chart data={data} /> */}
				<Box
					ref={boxref}
				>

					{(cardWidth > 0) && <D3Dynamic data={flairData} cardWidth={cardWidth} /> }
				</Box>

			</Grid>
			{/* <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap='24px'>
        <Projects
          title={"Projects"}
          amount={30}
          captions={["Companies", "Members", "Budget", "Completion"]}
          data={dashboardTableData}
        />
        <OrdersOverview
          title={"Orders Overview"}
          amount={30}
          data={timelineData}
        />
      </Grid> */}
		</Flex>
	)
}
