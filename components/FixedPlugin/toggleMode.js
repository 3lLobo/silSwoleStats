import { IconButton, useColorMode, DarkMode, useColorModeValue } from "@chakra-ui/react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

function ToggleMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgButton = useColorModeValue("#f5f5f5", "gray.600");

    return (
            <IconButton
            h="52px"
            w="52px"
            bg={bgButton}
            position="fixed"
            variant="no-hover"
            right="35px"
            bottom="30px"
            borderRadius="50px"
            boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
                // className="ml-1"
                // bg="blueviolet"
                onClick={toggleColorMode}
                aria-label="Toggle"
                _hover={{ bg: "none" }}
                _active={{ bg: "none" }}
                rounded="full"
                variant={"outline"}
            >
                {colorMode === "light" ? <IoMoonOutline /> : <IoSunnyOutline /> }
            </IconButton>
    );
}

export default ToggleMode;
