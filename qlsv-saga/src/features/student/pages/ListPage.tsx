import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import {
  selectStudentLoading,
  selectStudentFilter,
  selectStudentList,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { useEffect } from 'react';
import { ListParams, Student } from 'models';
import studentApi from 'api/studentApi';
import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import { toast } from 'react-toastify';
import routes from 'config/routes';

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      position: 'relative',
      paddingTop: theme.spacing(1),
    },

    titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',

      marginBottom: theme.spacing(4),
    },

    loading: {
      position: 'absolute',
      top: theme.spacing(-1),
      width: '100%',
    },
  };
});

export default function ListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      // Remove student API
      await studentApi.remove(student?.id || '');

      toast.success('🦄 Wow so easy, Remove student successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch student', error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    navigate(`${location.pathname}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>

        <Link to={`${location.pathname}/${routes.add}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onEdit={handleEditStudent}
        onRemove={handleRemoveStudent}
      />

      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
