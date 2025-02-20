import { FileTextOutlined, VideoCameraOutlined, FileImageOutlined } from "@ant-design/icons";
import React from 'react';

export const checkFileType = (url: string) => {
  const extension = url.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return 'image';
  if (['mp4', 'mov', 'avi'].includes(extension || '')) return 'video';
  if (['pdf', 'doc', 'docx'].includes(extension || '')) return 'document';
  return 'file';
};

export const renderFileIcon = (url: string) => {
  const type = checkFileType(url);
  const iconProps = { className: "text-lg mr-2" };
  switch (type) {
    case 'image': return <FileImageOutlined {...iconProps} />;
    case 'video': return <VideoCameraOutlined {...iconProps} />;
    case 'document': return <FileTextOutlined {...iconProps} />;
    default: return <FileTextOutlined {...iconProps} />;
  }
};