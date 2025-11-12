const moduleObj = {
  id: 1,
  name: "Express JS",
  description: "Create a NodeJS server with ExpressJS",
  course: "Web Development",
};
export default function ModuleObject(app) {
  const getModule = (req, res) => {
    res.json(moduleObj);
  };
  app.get("/lab5/module", getModule);

  const getModuleTitle = (req, res) => {
    res.json(moduleObj.name);
  };
  app.get("/lab5/module/name", getModuleTitle);

  const setModuleName = (req, res) => {
    const { newName } = req.params;
    moduleObj.name = newName;
    res.json(moduleObj);
  };
  app.get("/lab5/module/name/:newName", setModuleName);

  const setModuleDescription = (req, res) => {
    const { newDescription } = req.params;
    moduleObj.description = newDescription;
    res.json(moduleObj);
  };
  app.get("/lab5/module/description/:newDescription", setModuleDescription);
}
