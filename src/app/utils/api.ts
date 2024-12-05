
export const handleError = (res: any, error: any) => {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  };
  
  export const handleSuccess = (res: any, data: any) => {
    res.status(200).json(data);
  };
  