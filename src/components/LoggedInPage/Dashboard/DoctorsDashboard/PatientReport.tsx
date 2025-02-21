// PatientReports.tsx
import { Card, Typography, Image, Row, Col } from 'antd';
import { FileImageOutlined, FileTextOutlined } from '@ant-design/icons';
import moment from 'moment';

interface PatientReportsProps {
  patientName: string;
  notes: string;
  documents: string[];
  appointmentDate: string;
}

const PatientReports: React.FC<PatientReportsProps> = ({
  patientName,
  notes,
  documents,
  appointmentDate
}) => {
  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  };

  return (
    <Card className="reports-container">
      {/* Patient Header */}
      <div className="patient-header">
        <Typography.Title level={4}>{patientName}</Typography.Title>
        <Typography.Text type="secondary">
  {moment(appointmentDate, "DD-MM-YYYY").format("DD-MM-YYYY")}
</Typography.Text>
      </div>

      {/* Clinical Notes Section */}
      <div className="section">
        <Typography.Title level={5}>Clinical Notes</Typography.Title>
        <div className="notes-content">
          {notes || <Typography.Text type="secondary">No notes available</Typography.Text>}
        </div>
      </div>

      {/* Attached Images/Documents Section */}
      <div className="section">
        <Typography.Title level={5}>
          Attached Documents ({documents.length})
        </Typography.Title>
        <Row gutter={[16, 16]}>
          {documents.map((url, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              {isImage(url) ? (
                <Image
                  src={url}
                  alt={`Attachment ${index + 1}`}
                  className="document-image"
                  preview={{
                    maskClassName: 'image-preview-mask',
                    mask: 'View Image'
                  }}
                />
              ) : (
                <Card className="document-card">
                  <FileTextOutlined className="document-icon" />
                  <a href={url} target="_blank" rel="noopener">
                    View Document
                  </a>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      </div>

      <style >{`
        .reports-container {
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .patient-header {
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .notes-content {
          white-space: pre-wrap;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 4px;
          min-height: 100px;
        }

        .document-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 4px;
          cursor: pointer;
        }

        .document-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          height: 200px;
          justify-content: center;
        }

        .document-icon {
          font-size: 32px;
          margin-bottom: 8px;
          color: #1890ff;
        }

        .image-preview-mask {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </Card>
  );
};

export default PatientReports;