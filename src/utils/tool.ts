import { ElNotification } from 'element-plus';

const copy = (text: string) => {
  const copyToClipboard = (text: string) =>
    navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(text);
  copyToClipboard(text);
  ElNotification.success('已复制到粘贴板');
};

export { copy };
