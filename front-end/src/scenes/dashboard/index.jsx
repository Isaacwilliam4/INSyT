import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
// import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from '../../theme';
import { mockTransactions } from '../../data/mockData';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import BugReportIcon from '@mui/icons-material/BugReport';
import ArticleIcon from '@mui/icons-material/Article';
import GppBadIcon from '@mui/icons-material/GppBad';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import GeographyChart from '../../components/GeographyChart';
import BarChart from '../../components/BarChart';
import StatBox from '../../components/StatBox';
import ProgressCircle from '../../components/ProgressCircle';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [db, setDb] = useState(null);
  const [logDataLength, setLogDataLength] = useState(0);
  const [benignAttacks, setBenignAttacks] = useState(0);
  const [nonBenignAttacks, setNonBenignAttacks] = useState(0);
  const [topAttack, setTopAttack] = useState(null);
  const [attackTypes, setAttackTypes] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [lineDataYears, setLineDataYears] = useState(null);
  const [lineDataMonths, setLineDataMonths] = useState(null);
  const [lineDataDates, setLineDataDates] = useState(null);
  const [lineDataHours, setLineDataHours] = useState(null);
  const [lineDataMinutes, setLineDataMinutes] = useState(null);
  const [basicLineData, setBasicLineData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  const fetchNonBenignAttacks = async () => {
    const response = await axios
      .get('http://localhost:5656/api/db/non-benign')
      .then((response) => {
        setNonBenignAttacks(response.data);
      });
  };

  const fetchTopAttack = async () => {
    const response = await axios
      .get('http://localhost:5656/api/db/top-attack')
      .then((response) => {
        setTopAttack(response.data);
      });
  };

  const fetchAttackTypes = async () => {
    const response = await axios
      .get('http://localhost:5656/api/db/attack-types-all')
      .then((response) => {
        setAttackTypes(response.data);
      });
  };

  const buildLineChartData = () => {
    //Build up the ticket number based on the date and time
    const attackData = {
      id: 'insyt log data classification',
      color: colors.greenAccent[500],
      data: [],
    };

    let date_time_map = new Map();
    let year_map = new Map();
    let month_map = new Map();
    let date_map = new Map();
    let hour_map = new Map();
    let minute_map = new Map();

    db.forEach((log) => {
      if (date_time_map.has(log.date_time)) {
        date_time_map.set(log.date_time, date_time_map.get(log.date_time) + 1);
      } else {
        date_time_map.set(log.date_time, 1);
      }
      if (year_map.has(log.date_time.substring(0, 4))) {
        year_map.set(
          log.date_time.substring(0, 4),
          year_map.get(log.date_time.substring(0, 4)) + 1
        );
      } else {
        year_map.set(log.date_time.substring(0, 4), 1);
      }
      if (month_map.has(log.date_time.substring(0, 7))) {
        month_map.set(
          log.date_time.substring(0, 7),
          month_map.get(log.date_time.substring(0, 7)) + 1
        );
      } else {
        month_map.set(log.date_time.substring(0, 7), 1);
      }
      if (date_map.has(log.date_time.substring(0, 10))) {
        date_map.set(
          log.date_time.substring(0, 10),
          date_map.get(log.date_time.substring(0, 10)) + 1
        );
      } else {
        date_map.set(log.date_time.substring(0, 10), 1);
      }
      if (hour_map.has(log.date_time.substring(0, 13))) {
        hour_map.set(
          log.date_time.substring(0, 13),
          hour_map.get(log.date_time.substring(0, 13) + 1)
        );
      } else {
        hour_map.set(log.date_time.substring(0, 13), 1);
      }
      if (minute_map.has(log.date_time.substring(0, 16))) {
        minute_map.set(
          log.date_time.substring(0, 16),
          minute_map.get(log.date_time.substring(0, 16)) + 1
        );
      } else {
        minute_map.set(log.date_time.substring(0, 16), 1);
      }
    });

    // sort the map by date
    const sortedMap = new Map(
      [...date_time_map.entries()].sort((a, b) => {
        return new Date(a[0]) - new Date(b[0]);
      })
    );

    // set the data as a list of objects
    sortedMap.forEach((value, key) => {
      attackData.data.push({
        x: key,
        y: value,
      });
    });

    const sortedYearMap = new Map(
      [...year_map.entries()].sort((a, b) => {
        return new Date(a[0]) - new Date(b[0]);
      })
    );

    const sortedMonthMap = new Map(
      [...month_map.entries()].sort((a, b) => {
        return new Date(a[0]) - new Date(b[0]);
      })
    );

    const sortedDateMap = new Map(
      [...date_map.entries()].sort((a, b) => {
        return new Date(a[0]) - new Date(b[0]);
      })
    );

    const sortedHourMap = new Map(
      [...hour_map.entries()].sort((a, b) => {
        return new Date(a[0]) - new Date(b[0]);
      })
    );

    const sortedMinuteMap = new Map(
      [...minute_map.entries()].sort((a, b) => {
        return new Date(a[0]) - new Date(b[0]);
      })
    );

    const attackYearData = {
      id: 'insyt log data classification',
      color: colors.greenAccent[500],
      data: [],
    };

    sortedYearMap.forEach((value, key) => {
      attackYearData.data.push({
        x: key,
        y: value,
      });
    });

    const attackMonthData = {
      id: 'insyt log data classification',
      color: colors.greenAccent[500],
      data: [],
    };

    sortedMonthMap.forEach((value, key) => {
      attackMonthData.data.push({
        x: key,
        y: value,
      });
    });

    const attackDateData = {
      id: 'insyt log data classification',
      color: colors.greenAccent[500],
      data: [],
    };

    sortedDateMap.forEach((value, key) => {
      attackDateData.data.push({
        x: key,
        y: value,
      });
    });

    const attackHourData = {
      id: 'insyt log data classification',
      color: colors.greenAccent[500],
      data: [],
    };

    sortedHourMap.forEach((value, key) => {
      attackHourData.data.push({
        x: key,
        y: value,
      });
    });

    const attackMinuteData = {
      id: 'insyt log data classification',
      color: colors.greenAccent[500],
      data: [],
    };

    sortedMinuteMap.forEach((value, key) => {
      attackMinuteData.data.push({
        x: key,
        y: value,
      });
    });

    setLineDataYears([sortedYearMap]);
    setLineDataMonths([sortedMonthMap]);
    setLineDataDates([sortedDateMap]);
    setLineDataHours([sortedHourMap]);
    setLineDataMinutes([sortedMinuteMap]);
    setLineData([attackData]);
    setBasicLineData([sortedMinuteMap]);
  };

  const buildBarChartData = () => {
    const barData = [];
    attackTypes.forEach((attackType) => {
      const entry = {
        country: attackType.classification,
      };
      // Using bracket notation to set the key dynamically
      entry[attackType.classification] = attackType.count;
      barData.push(entry);
    });
    // console.log(attackData);
    setBarChartData(barData);
  };

  const fetchData = async () => {
    const response = await axios
      .get('http://localhost:5656/api/db/data')
      .then(async (response) => {
        setDb(response.data);
        setLogDataLength(response.data.length);
        await fetchNonBenignAttacks();
        await fetchTopAttack();
        await fetchAttackTypes();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (attackTypes) {
      buildLineChartData();
      buildBarChartData();
    }
  }, [attackTypes]);

  return (
    <Box m='20px'>
      {/* HEADER */}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
            onClick={fetchData}
          >
            <DownloadOutlinedIcon sx={{ mr: '10px' }} />
            Regenerate Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='140px'
        gap='20px'
      >
        {/* ROW 1 */}
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title={topAttack ? topAttack[0].classification : 'N/A'}
            subtitle='Top Attack Type'
            progress='0.75'
            increase='+14%'
            icon={
              <BugReportIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title={attackTypes ? attackTypes.length : 'N/A'}
            subtitle='Different Attack Type Numbers'
            progress='0.50'
            increase='+21%'
            icon={
              <FlashOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title={logDataLength}
            subtitle='Log Data'
            progress='0.30'
            increase='+5%'
            icon={
              <ArticleIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <StatBox
            title={nonBenignAttacks.length}
            subtitle='Unusual Attacks'
            progress='0.80'
            increase='+43%'
            icon={
              <GppBadIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn='span 8'
          gridRow='span 2'
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt='25px'
            p='0 30px'
            display='flex '
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <Typography
                variant='h5'
                fontWeight='600'
                color={colors.grey[100]}
              >
                Security Attack Classification
              </Typography>
              <Typography
                variant='h3'
                fontWeight='bold'
                color={colors.greenAccent[500]}
              >
                Total: {db ? db.length : 'N/A'}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: '26px', color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height='250px' m='-20px 0 0 0'>
            <LineChart data={lineData ? lineData : []} isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn='span 4'
          gridRow='span 2'
          backgroundColor={colors.primary[400]}
          overflow='auto'
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p='15px'
          >
            <Typography color={colors.grey[100]} variant='h5' fontWeight='600'>
              Recent Attack Classification
            </Typography>
          </Box>
          {db
            ? db.map((log, i) => (
                <Box
                  key={i}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p='15px'
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant='h5'
                      fontWeight='600'
                    >
                      {log.line.substring(0, 30)}...
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {/* {log.line.substring(0, 15)} */}
                      {log.date_time}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{log.date}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p='5px 10px'
                    borderRadius='4px'
                  >
                    {log.classification}
                  </Box>
                </Box>
              ))
            : null}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn='span 4'
          gridRow='span 2'
          backgroundColor={colors.primary[400]}
          p='30px'
        >
          <Typography variant='h5' fontWeight='600'>
            Unusual Attack Rate
          </Typography>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            mt='25px'
          >
            <ProgressCircle
              progress={
                nonBenignAttacks
                  ? db
                    ? Math.ceil((nonBenignAttacks.length / db.length) * 100) /
                      100
                    : 0
                  : 0
              }
              size='125'
            />
            <Typography
              variant='h5'
              color={colors.greenAccent[500]}
              sx={{ mt: '15px' }}
            >
              {nonBenignAttacks
                ? db
                  ? Math.ceil((nonBenignAttacks.length / db.length) * 100)
                  : 0
                : 0}
              % Unusual Attacks Detected
            </Typography>
            <Typography>Non Benign Type Attacks Rate</Typography>
          </Box>
        </Box>
        <Box
          gridColumn='span 4'
          gridRow='span 2'
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant='h5'
            fontWeight='600'
            sx={{ padding: '30px 30px 0 30px' }}
          >
            Unusual Attack Quantity
          </Typography>
          <Box height='250px' mt='-20px'>
            <BarChart
              data={barChartData ? barChartData : []}
              isDashboard={true}
            />
          </Box>
        </Box>
        <Box
          gridColumn='span 4'
          gridRow='span 2'
          backgroundColor={colors.primary[400]}
          padding='30px'
        >
          <Typography
            variant='h5'
            fontWeight='600'
            sx={{ marginBottom: '15px' }}
          >
            Geography Based Attacks
          </Typography>
          <Box height='200px'>
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
