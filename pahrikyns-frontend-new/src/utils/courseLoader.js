export const courses = {
  aws: import.meta.glob("../courses/aws/*/", { eager: true }),
  devops: import.meta.glob("../courses/devops/*/", { eager: true }),
  os: import.meta.glob("../courses/os/*/", { eager: true }),
};
