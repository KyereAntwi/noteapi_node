import BaseResponse, { FilterBase } from '../models/BaseResponse';
import Note from '../models/Note';
import dbContext from './initializeDatabase';

export const getAllNotes = async ({ keyword, page, size }: FilterBase) => {
  const response: BaseResponse<Note[]> = {
    statusCode: 200,
    success: true,
    message: 'Success',
  };

  try {
    const all = await dbContext.any(
      `
      SELECT *
      FROM notes
      `
    );

    response.data = all;
  } catch (error) {
    response.data = undefined;
    response.message = 'An error occured querying the database';
    response.statusCode = 500;
    response.success = false;
    console.log(error);
  } finally {
    dbContext.$pool.end;
  }

  return response;
};
