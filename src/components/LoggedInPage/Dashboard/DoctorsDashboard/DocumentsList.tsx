import { Input, Button, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { renderFileIcon } from "../../../../hooks/fileUtils";
import { useState } from "react";

const DocumentsList = ({
  existingDocs,
  newUrls,
  setNewUrls,
  docsToDelete,
  setDocsToDelete
}: any) => {
  const [newUrl, setNewUrl] = useState("");

  return (
    <div className="border-t pt-4">
      <Typography.Title level={5} className="!mb-4">
        Attached Documents
      </Typography.Title>
      
      <div className="flex gap-2 mb-4">
        <Input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Enter document URL"
          onPressEnter={() => {
            if (newUrl.trim()) {
              setNewUrls([...newUrls, newUrl.trim()]);
              setNewUrl('');
            }
          }}
        />
        <Button 
          onClick={() => {
            if (newUrl.trim()) {
              setNewUrls([...newUrls, newUrl.trim()]);
              setNewUrl('');
            }
          }}
        >
          Add URL
        </Button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {[...existingDocs, ...newUrls].map((url, index) => (
          <div key={`${url}-${index}`} className="flex items-center justify-between p-2 hover:bg-gray-50">
            <div className="flex items-center flex-1">
              {renderFileIcon(url)}
              <a href={url} target="_blank" rel="noopener" className="ml-2 truncate">
                {url.split('/').pop()}
              </a>
            </div>
            <Button
              type="text"
              danger
              icon={<CloseOutlined />}
              onClick={() => {
                if (existingDocs.includes(url)) {
                  setDocsToDelete([...docsToDelete, url]);
                }
                setNewUrls(newUrls.filter((u: string) => u !== url));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsList;