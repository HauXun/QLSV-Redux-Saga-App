import { Box } from '@mui/material';
import { Header, Sidebar } from 'components/Common';
import { Outlet, RouteProps } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      gridTemplateColumns: '240px 1fr',
      gridTemplateAreas: `"header header" "sidebar main"`,

      minHeight: '100vh',
    },

    header: {
      gridArea: 'header',
    },
    sidebar: {
      gridArea: 'sidebar',
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
    },
    main: {
      gridArea: 'main',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 3),
    },
  };
});

export function AdminLayout(props: RouteProps) {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>

      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>

      <Box className={classes.main}>
        <Outlet />
      </Box>
    </Box>
  );
}
