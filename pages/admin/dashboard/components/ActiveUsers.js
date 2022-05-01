// Chakra imports
import { Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/Card/Card.js";
import CardBody from "../../../../components/Card/CardBody.js";
// Custom icons
import {
  CartIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "../../../../components/Icons/Icons.js";
import React from "react";
import ChartStatistics from "./ChartStatistics";

const ActiveUsers = ({ title, percentage, chart }) => {
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card p='16px'>
      <CardBody>
        <Flex direction='column' w='100%'>
          {chart}
          <Flex direction='column' mt='24px' mb='36px' alignSelf='flex-start'>
            <Text fontSize='lg' color={textColor} fontWeight='bold' mb='6px'>
              {title}
            </Text>
            <Text fontSize='md' fontWeight='medium' color='gray.400'>
              <Text
                as='span'
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight='bold'>
                {percentage > 0 ? `+${percentage}%` : `-${percentage}%`}
              </Text>{" "}
              than last week
            </Text>
          </Flex>
          <SimpleGrid gap={{ sm: "12px" }} columns={4}>
            <ChartStatistics
              title={"Bench"}
              amount={"190 kg"}
              percentage={10}
              icon={<WalletIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"Squat"}
              amount={"230 kg"}
              percentage={30}
              icon={<RocketIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"Deadlift"}
              amount={"260 kg"}
              percentage={30}
              icon={<CartIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
            <ChartStatistics
              title={"Clean"}
              amount={"30 kg"}
              percentage={100}
              icon={<StatsIcon h={"15px"} w={"15px"} color={iconBoxInside} />}
            />
          </SimpleGrid>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ActiveUsers;
