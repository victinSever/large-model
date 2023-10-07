import { ElNotification } from 'element-plus';

const copy = (text: string) => {
  // const copyToClipboard = (text: string) =>
  //   navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(text);
  // copyToClipboard(text);
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  ElNotification.success('已复制到粘贴板');
};

export { copy };
