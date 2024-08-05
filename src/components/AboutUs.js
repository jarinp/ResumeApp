import { Typography, Box, Stack } from '@mui/material';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import React from 'react';
import Navbar from './Navbar/Navbar';

function AboutUs() {
  return (
    <Box>
      <Navbar />
      <Stack p={{ xs: "15px", sm: "15px", md: "15px", lg: "60px " }}marginTop={3}>
        <h1>Resume Builder</h1>
        <Stack
          className="midContainer"
          direction={{
            xs: "column-reverse",
            sm: "column-reverse",
            md: "column-reverse",
            lg: "row",
          }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          mt="20px"
        >
          <Typography
            sx={{
              fontSize: {
                xs: "13px",
                sm: "15px",
                md: "17px",
                lg: "19px",
              },
              
              paddingRight: {
                xs: "15px",
                sm: "18px",
                lg: "25px",
              },
              textAlign: "justify",
            }}
          >
            A resume builder is an online tool that you can use to quickly
            create a resume. Resume builders allow you to pick a pre-formatted
            resume template, fill in your contact and background information,
            and select pre-written work history bullet points — saving you a lot
            of time. Pick a high-quality resume builder that’s easy to use,
            includes a good selection of professional templates, and provides
            bullet points tailored to your needs so you can best demonstrate
            your previous achievements in context. Create an account to save
            your progress and multiple versions, plus download as a PDF. Resume
            Builder offers free, HR-approved resume templates to help you create
            a professional resume in minutes. Choose from several template
            options and even pre-populate a resume from your LinkedIn profile.
            Create an account to save your progress and multiple versions, plus
            download as a PDF.
          </Typography>
          <Box
            component="img"
            src="https://media.licdn.com/dms/image/C4E12AQGfRN7r6mctBA/article-cover_image-shrink_720_1280/0/1520119338014?e=1727308800&v=beta&t=Sl6ejSZD3LrdkFZvpfEQM4VqX7K2IXpYr4T-cAB7ViE"
            alt="img"
            sx={{
              width: { xs: "97%", sm: "97%", md: "100%", lg: "500px" },
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Stack>
        <Box mt="25px">
          <Typography
            sx={{
              fontSize: {
                xs: "22px",
                sm: "25px",
                md: "27px",
                lg: "30px",
              },
              fontWeight: "400",
              color: "dark",
            }}
          >
            Share with your friends
          </Typography>
          <Box className="icons">
            <FacebookOutlinedIcon
              sx={{ fontSize: "40px", paddingLeft: "15px" }}
              color="primary"
            />
            <LinkedInIcon
              sx={{ fontSize: "40px", paddingLeft: "15px" }}
              color="primary"
            />
            <WhatsAppIcon
              sx={{ fontSize: "40px", paddingLeft: "15px" }}
              color="success"
            />
            <TwitterIcon
              sx={{ fontSize: "40px", paddingLeft: "15px" }}
              color="info"
            />
            <EmailIcon
              sx={{ fontSize: "40px", paddingLeft: "15px" }}
              color="error"
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default AboutUs;
