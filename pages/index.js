/*!

=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/purity-ui-dashboard/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useRef } from "react";
import Link from "next/link"

import AuthNavbar from "../components/Navbars/AuthNavbar.js";

import { useUser } from '../hooks/authUser'
import { useDisclosure, Box, Portal, HStack, Center, Text, Hide, Heading, Button } from "@chakra-ui/react"
import { AuthRedirect } from "../hooks/authUser.js";
import { useRouter } from "next/router";

const Index = () => {
  // AuthRedirect()

  const { user } = useUser();
  const router = useRouter()

  console.log(user)

  useEffect(() => {
    if (user) {
      router.push('/admin/dashboard')
    } else {
      router.push('/auth/login')
    }
  }, [user, router])

  return (
    <Box>
    </Box>
  )
}

export default Index
