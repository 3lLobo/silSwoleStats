// Chakra imports
import { Flex } from '@chakra-ui/react'
import React from 'react'
import Authors from '/components/Admin/Tables/components/Authors'
import Projects from '/components/Admin/Tables/components/Projects'
import { tablesTableData, dashboardTableData } from '../../../variables/general'

function CheckIn() {
    return (
        <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
            {/* <Authors
        title={"Authors Table"}
        captions={["Author", "Function", "Status", "Employed", ""]}
        data={tablesTableData}
      /> */}
            <Projects
                title={'Weekly check In with Sil'}
                captions={['Attribute', 'Value', 'Status', 'Completion', '']}
                data={dashboardTableData}
            />
        </Flex>
    )
}

export default CheckIn
