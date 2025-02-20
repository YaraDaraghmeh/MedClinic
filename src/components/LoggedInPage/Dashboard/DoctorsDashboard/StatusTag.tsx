import { Tag } from "antd";
import { STATUS_COLORS } from "../../../../hooks/Cons";

const StatusTag = ({ status }: { status: string }) => {
  const statusConfig = STATUS_COLORS[status.toLowerCase() as keyof typeof STATUS_COLORS] || STATUS_COLORS.pending;
  
  return (
    <Tag
      style={{
        backgroundColor: statusConfig.backgroundColor,
        color: statusConfig.textColor,
        border: `1px solid ${statusConfig.borderColor}`,
        borderRadius: '20px',
        padding: '4px 12px',
        fontWeight: 500,
      }}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </Tag>
  );
};

export default StatusTag;