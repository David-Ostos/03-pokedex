

export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3001,
  defaultLimit: +process.env.DEFAULT_LIMIT || 7
});



/* esta es la equivalencia a la arrow function de EnvConfiguration
const envfb = () => {
  return {

  };
};
 */
