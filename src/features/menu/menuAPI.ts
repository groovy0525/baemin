export const getMenuList = async () => {
  const response = await fetch(
    "https://us-central1-react-baemin.cloudfunctions.net/merchantInfo"
  );
  return response.json();
};
