import { Container, Box, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";

import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";
import { useSelector } from "react-redux";

/** REDUX SLICE & SELECTOR  **/

const topUserRetriever = createSelector(
  retrieveTopUsers,(topUsers) => ({ 
    topUsers 
  }));

export default function ActiveUsers() {
  const {topUsers} = useSelector(topUserRetriever)
  return (
    <div className={"active-users-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Active Users</Box>
          
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`
                  return (
                    <Card key={member._id} variant="outlined" className={"card"}>
                      <CardOverflow>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>
                      
                      <CardOverflow className="">
                        <Stack className={"info"}>
                          <Typography className={"member-nickname"}>
                            {member.memberNick}
                          </Typography>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className={"no-data"}>No Active Users!</Box>
              )}
            </CssVarsProvider>
          </Stack>

          {/* Adding the Test component below the cards
          <Box className={"test-component"}> */}
            {/* <Test />
          </Box> */}
          
        </Stack>
      </Container>
    </div>
  );
}