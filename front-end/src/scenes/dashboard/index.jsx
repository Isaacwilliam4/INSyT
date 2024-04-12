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
      .get('http://localhost:5656/api/attack-types')
      .then((response) => {
        setAttackTypes(response.data);
      });
  };

  const buildLineChartData = () => {
    const data = [];
    const attackTypes = db.map((attack) => attack.classification);
    const uniqueAttackTypes = [...new Set(attackTypes)];

    uniqueAttackTypes.forEach((type) => {
      const attackData = db.filter((attack) => attack.classification === type);
      const attackCount = attackData.length;
      const attackDates = attackData.map((attack) => attack.date);
      const attackDateCounts = attackDates.reduce((acc, date) => {
        acc[date] = acc[date] ? acc[date] + 1 : 1;
        return acc;
      }, {});

      const attackDateData = Object.keys(attackDateCounts).map((date) => ({
        x: date,
        y: attackDateCounts[date],
      }));

      data.push({
        id: type,
        color: colors.greenAccent[500],
        data: attackDateData,
      });
    });

    return data;
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
                Total: 53,243
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
            <LineChart isDashboard={true} />
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
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
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
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p='5px 10px'
                borderRadius='4px'
              >
                {transaction.cost}
              </Box>
            </Box>
          ))}
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
            <ProgressCircle size='125' />
            <Typography
              variant='h5'
              color={colors.greenAccent[500]}
              sx={{ mt: '15px' }}
            >
              47% Attacks Detected
            </Typography>
            <Typography>Excludes Benign Type Attacks</Typography>
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
            <BarChart isDashboard={true} />
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
