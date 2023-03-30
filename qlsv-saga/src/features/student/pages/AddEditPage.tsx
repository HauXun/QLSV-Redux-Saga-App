import { Box, Typography } from '@mui/material';
import StudentForm from '../components/StudentForm';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';
import { Student } from 'models';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import studentApi from 'api/studentApi';
import { toast } from 'react-toastify';
import routes from 'config/routes';

export default function AddEditPage() {
  const navigate = useNavigate();
  const { id: studentId } = useParams<{ id: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    // IFFE
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log('Failed to fetch student details', error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (formValues: Student) => {
    // TODO: Handle submit here, call API  to add/update student
    if (isEdit) {
      await studentApi.update(formValues);
      // Toast success
      toast.success('🦄 Wow so easy, Update student successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      await studentApi.add(formValues);
      // Toast success
      toast.success('🦄 Wow so easy, Add student successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    // Redirect back to student list
    navigate(`/${routes.admin}/${routes.students}`);
  };

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <Box>
      <Link to={`/${routes.admin}/${routes.students}`}>
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
