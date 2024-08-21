import pgp, { ParameterizedQuery } from 'pg-promise';
import config from 'config';

const connectionString = config.get('postgres');

const dbContext = pgp({})(connectionString!);

export const connectToDB = async () => {
  try {
    await dbContext.connect();
    console.log('DB connected!');
  } catch (error) {
    console.error(error);
  }
};

export const PQ = ParameterizedQuery;

export default dbContext;
