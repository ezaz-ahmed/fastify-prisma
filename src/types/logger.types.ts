type LoggerConfig = {
  transport: {
    target: string;
    options: {
      translateTime: string;
      ignore: string;
    };
  };
};

export type EnvToLogger = {
  development: LoggerConfig;
  production: boolean;
  test: boolean;
};
