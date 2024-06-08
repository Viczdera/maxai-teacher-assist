import { useEffect, useMemo, useState } from "react";
import textStyles from "../../components/texts.module.scss";
import styles from "./student.module.scss";
import Back from "../../components/navigation/back";
import { useParams } from "react-router-dom";
import Divider from "../../components/inputs/divider";
import { useNewTaskModal } from "../../provider/contexts/newTaskContext";
import Avatar from "../../components/dataDisplay/avatar";
import { StudentData } from "../../constants/typess";
import { fetchStudentById } from "../../requests/fetchStudents";

const Student = () => {
  const [student, setStudent] = useState<StudentData>({});
  const { studentId } = useParams();
  const { openModal } = useNewTaskModal();
  useEffect(() => {
    if (studentId)
      fetchStudentById(studentId).then((data) => {
        setStudent(data || []);
      });
  }, []);
  const studentItems: { title: string; value: string }[] = useMemo(
    () => [
      { title: "firstname", value: student?.firstname || "" },
      { title: "lastname", value: student?.lastname || "" },
      { title: "grade", value: student?.grade || "" },
      { title: "email", value: student?.email || "" },
    ],
    [student]
  );
  //TODO:ADD LOADING STATES FOR EVERYTING
  return (
    <div className="parent">
      <div className={`child ${styles.student}`}>
        <Back />
        <p className={textStyles.sectionTitle}>Student Profile</p>
        <div className={`card-cont ${styles.overview}`}>
          <div className={styles.avatarName}>
            <Avatar />
            <div className={styles.name}>
              <p
                className={textStyles.cardMd}
              >{`${student?.firstname} ${student?.lastname}`}</p>
              <p>{student?.schoolId}</p>
              <div>
                <button className="button-default" onClick={()=>{
                  openModal("one",studentId)
                }}>
                  Assign book
                </button>
              </div>
            </div>
          </div>
          <Divider mt="var(--p-md)" mb="var(--p-md)" />
          <div className={styles.statsCont}>
            {studentItems.map((item, i) => (
              <div key={i}>
                <p>{item.title}</p>
                <p className={textStyles.cardMd}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
