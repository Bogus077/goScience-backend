const dotenv = require('dotenv');

dotenv.config();

const {
  PROTOCOL,
  PORT,
  HOST,
  HOST_URL,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  TOKEN_SECRET,
  TOKEN_EXPIRY_HOURS,
  REFRESH_TOKEN_EXPIRY_HOURS,
  MAIL_USER,
  MAIL_PASSWORD,
  PASS_RESET,
  EMAIL_CONFIRM,
  SUBS_PAGE,
} = process.env;

const serverConfig = { port: PORT, host: HOST, hostUrl: HOST_URL };

const SQLConfig = {
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
  dialect: 'postgres',
};

const mailConfig = {
  user: MAIL_USER,
  pass: MAIL_PASSWORD,
  links: {
    host: PROTOCOL + HOST_URL,
    activationLink: EMAIL_CONFIRM,
    passResetLink: PASS_RESET,
    subsPageLink: SUBS_PAGE,
  },
};

const jwtExpiryTime = parseInt(TOKEN_EXPIRY_HOURS) * 3600;
const refreshExpiryTime = parseInt(REFRESH_TOKEN_EXPIRY_HOURS) * 3600;

module.exports = {
  development: SQLConfig,
  dbconn: SQLConfig,
  serverConfig: serverConfig,
  jwtSecret: TOKEN_SECRET,
  jwtExpiryTime,
  refreshExpiryTime,
  mailConfig,
};
