CREATE TABLE public.users (
    user_id SERIAL Primary Key ,
    name text NOT NULL,
    email text NOT NULL unique,
    mobile character varying(10) unique NOT NULL,
    password text  NOT NULL,
    classname text NOT NULL,
    resetlink text 
);
CREATE TABLE public.preference (
      name text NOT NULL,
      seatnumber integer NOT NULL default 0,
      status text   DEFAULT 'Not Approved'
      classname text NOT NULL,
      date text NOT NULL,
      startTime text  NOT NULL,
      endTime text  NOT NULL,
      preference text NOT NULL,
      user_id INTEGER NOT NULL
      REFERENCES users (user_id)
      ON DELETE CASCADE,
      submittedAt timestamp  default current_timestamp
);



