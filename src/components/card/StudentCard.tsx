import { Row, Col } from "antd";
import {
  AcademicCapIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
type StudentCardProps = {
  student?: Record<string, any>;
  loading?: boolean;
};

export const StudentCard: React.FC<StudentCardProps> = ({ student, loading, ...rest }) => {
  console.log(student);
  return (
    <div className="student-card">
      <div className="student-card-avatar">
        <img src={student?.avatar || 'https://i.pinimg.com/280x280_RS/55/96/4e/55964ebb02710d6b9ce1c26f1d857906.jpg'} alt="" />
      </div>
      <div className="student-card-info">
        <h3 className="student-card-info-name">{student?.name}</h3>
        <div className="student-card-info-detail">
          <div className="student-card-info-detail-school-location">
            <div className="student-card-icon-value">
              <BuildingOfficeIcon /> {student?.school?.name || "N/A"}
            </div>
            <div className="student-card-icon-value">
              <MapPinIcon /> {student?.location || "N/A"}
            </div>
          </div>
          <div className="student-card-icon-value">
            <AcademicCapIcon />
            {student?.major || "N/A"}
          </div>
          <div className="student-card-icon-value">
            <CalendarIcon />
            Tốt nghiệp vào {student?.expected_graduation || "2025"}
          </div>
        </div>
      </div>
    </div>
  );
};

// {
//   "pk": 3,
//   "account": {
//       "id": 3,
//       "email": "s2@example.com",
//       "first_name": "Vo Thuan",
//       "last_name": "Nguyen",
//       "avatar": "https://official-offer.s3.amazonaws.com/media/public/accounts/avatars/1696360759482_U7ZQ8u3.jpeg",
//       "title": "",
//       "phone_number": "",
//       "self_description": ""
//   },
//   "school": {
//       "id": 1,
//       "name": "MIT",
//       "logo": "https://official-offer.s3.amazonaws.com/media/public/schools/logo/1024px-MIT_logo.svg.png",
//       "background_image": "https://official-offer.s3.amazonaws.com/media/public/schools/background/mit-minecraft-killian-court_0.jpg"
//   },
//   "expected_graduation_date": null,
//   "school_year": null,
//   "gpa": 4.0,
//   "majors": [
//       1
//   ],
//   "active_resume": {
//       "pk": 63,
//       "resume": "https://official-offer.s3.amazonaws.com/media/private/students/resumes/Report_H646WNC.pdf?AWSAccessKeyId=AKIA5DRKAVZZLJXECPNT&Signature=VzffxZan%2FksH0hT7myO5MaU5ibQ%3D&Expires=1705234358",
//       "is_active": true
//   }
// },
