import React from 'react';
import { TContainer, TContainer2 } from '../BaseWrapper';
import PropTypes from 'prop-types';
import {Tabs,Divider, Tab , Typography, Box} from '@mui/material';
import UserInfoTab2 from '../UserInfoTab2';
import UserInfoTab1 from '../UserInfoTab1';

const TabPanel = (props)  => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const UserInfo = () => {


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <TContainer>
        <TContainer2>

          <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: '80vh'  }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider'  }}
            >
              <Tab label="User" {...a11yProps(0)}  />
              <Tab label="Personal Info" {...a11yProps(1)}  />
              {/* <Tab label="Item Three" {...a11yProps(2)} />
              <Tab label="Item Four" {...a11yProps(3)} />
              <Tab label="Item Five" {...a11yProps(4)} />
              <Tab label="Item Six" {...a11yProps(5)} />
              <Tab label="Item Seven" {...a11yProps(6)} /> */}
            </Tabs>
            <TabPanel value={value} index={0}>
              <UserInfoTab1 />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UserInfoTab2 />
            </TabPanel>
            {/* <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
              Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
              Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
              Item Seven
            </TabPanel> */}
          </Box>

        </TContainer2>
      </TContainer>

    </div>
  )
}

export default UserInfo;