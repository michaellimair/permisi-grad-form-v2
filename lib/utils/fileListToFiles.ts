const fileListToFiles = (fileList: FileList): File[] => {
  const files: File[] = [];
  for (let i = 0; i < fileList.length; i += 1) {
    files.push(fileList.item(i));
  }
  return files;
};

export default fileListToFiles;
