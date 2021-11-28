//All User Queries
const signinUserQuery = `SELECT * FROM users WHERE email = $1`;
const createUserQuery =
  "INSERT INTO users(name, email, mobile ,password, classname) VALUES($1, $2, $3, $4,$5) returning *";
const UpdateResetLinkQuery =
  "Update users set resetlink =$1 where user_id=$2  returning *";
const InsertPreferenceQuery =
  "INSERT INTO preference(name,classname,date,starttime,endtime,preference,user_id) VALUES($1, $2, $3, $4,$5,$6,$7) returning *";
const resetPasswordQuery = `SELECT * FROM users WHERE token =$1`;

const getAllPreferenceQuery = "SELECT * FROM preference WHERE user_id = $1 ";
const getOfflineCountQuery =
  "SELECT count(*),date,starttime FROM preference  WHERE classname= $1 and preference='offline' Group By date,starttime";
const FetchPreferenceQuery =
  "SELECT user_id,date,starttime,status FROM preference WHERE date=$1 and starttime=$2 order by submittedat";
const UpdatePreferenceQuery =
  "Update preference set status='Accepted' where user_id=$1 and date=$2 and starttime=$3 and preference='offline' returning *";
const UpdateseatnumberQuery =
  "Update preference  set seatnumber =$1 where user_id=$2 and date=$3 and starttime=$4 and preference='offline' returning *";
const RejectStatusQuery =
  "Update preference set status ='Rejected' where classname=$1 and preference='offline' and seatnumber=0 returning *";
const AcceptStatusQuery =
  "Update preference set status ='Accepted' where classname=$1 and preference='online' and seatnumber=0 returning *";
const getfinalDataQuery = "Select * from preference where classname=$1";
const deletePreferenceQuery = "DELETE FROM preference WHERE id=$1 returning *";

module.exports = {
  createUserQuery,
  resetPasswordQuery,
  signinUserQuery,
  deletePreferenceQuery,
  UpdateResetLinkQuery,
  InsertPreferenceQuery,
  getAllPreferenceQuery,
  getOfflineCountQuery,
  FetchPreferenceQuery,
  UpdatePreferenceQuery,
  UpdateseatnumberQuery,
  AcceptStatusQuery,
  RejectStatusQuery,
  getfinalDataQuery,
};
