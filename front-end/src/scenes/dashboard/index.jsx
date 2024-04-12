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
  const [barChartData, setBarChartData] = useState(null);

  const fetchNonBenignAttacks = async () => {
    const response = await axios
      .get('http://localhost:5656/api/non-benign')
      .then((response) => {
        setNonBenignAttacks(response.data);
      });
  };

  const fetchTopAttack = async () => {
    const response = await axios
      .get('http://localhost:5656/api/top-attack')
      .then((response) => {
        setTopAttack(response.data);
      });
  };

  const fetchAttackTypes = async () => {
    const response = await axios
      .get('http://localhost:5656/api/attack-types-all')
      .then((response) => {
        console.log(response.data);
        setAttackTypes(response.data);
        // wait 1 second
        setTimeout(() => {
        }, 1000);
        buildLineChartData();
        buildBarChartData();
      });
  };

  const buildLineChartData = () => {
    const attackData = {
      id: 'insyt log data classification',
      color: colors.greenAccent[500],
      data: [],
    };
    attackTypes.forEach((attackType) => {
      
      attackData.data.push({
        x: attackType.classification,
        y: attackType.count,
      });
    });
    setLineData([attackData]);
  };

  const buildBarChartData = () => {
    const barData = [
      {
        country: 'WU',
        'webshell upload': 0,
      },
      {
        country: 'PC',
        'password cracking': 0,
      },
      {
        country: 'SC',
        scan: 0,
      },
      {
        country: 'DE',
        'data exfiltration': 0,
      },
      {
        country: 'PE',
        'priviledged escalation': 0,
      },
      {
        country: 'CC',
        'command and control': 0
      },
    ]
    attackTypes.forEach((attackType) => {
      if (attackType.classification === 'webshell upload') {
        barData[0]['webshell upload'] = attackType.count;
      }
      if (attackType.classification === 'password cracking') {
        barData[1]['password cracking'] = attackType.count;
      }
      if (attackType.classification === 'scan') {
        barData[2].scan = attackType.count;
      }
      if (attackType.classification === 'data exfiltration') {
        barData[3]['data exfiltration'] = attackType.count;
      }
      if (attackType.classification === 'priviledged escalation') {
        barData[4]['priviledged escalation'] = attackType.count;
      }
      if (attackType.classification === 'command and control') {
        barData[5]['command and control'] = attackType.count;
      }
    });
    // console.log(attackData);
    setBarChartData(barData);
  };

  const fetchData = async () => {
    const response = await axios
      .get('http://localhost:5656/api/data')
      .then(async (response) => {
        setDb(response.data);
        setLogDataLength(response.data.length);
        await fetchNonBenignAttacks();
        await fetchTopAttack();
        await fetchAttackTypes();
      });
  };

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
            Generate Reports
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
            title={topAttack? topAttack[0].classification : 'N/A'}
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
            title={attackTypes? attackTypes.length : 'N/A'}
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
                Total: {db? db.length : 'N/A'}
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
            <LineChart data={lineData? lineData: []} isDashboard={true} />
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
          {db? db.map((log, i) => (
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
                  {log.line.substring(20, 50)}...
                </Typography>
                <Typography color={colors.grey[100]}>
                {log.line.substring(0, 15)}
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
          )): null}
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
            <ProgressCircle progress={nonBenignAttacks? db? Math.ceil(nonBenignAttacks.length/db.length*100)/100: 0: 0} size='125' />
            <Typography
              variant='h5'
              color={colors.greenAccent[500]}
              sx={{ mt: '15px' }}
            >
              {nonBenignAttacks? db? Math.ceil(nonBenignAttacks.length/db.length*100): 0: 0}% Unusual Attacks Detected
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
            <BarChart data={barChartData? barChartData: []} isDashboard={true} />
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
