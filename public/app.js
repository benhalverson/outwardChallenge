window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('renderCanvas');
  const engine = new BABYLON.Engine(canvas, true);

  // createScene function
  const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.White();
    // add a camera to the canvas
    const camera = new BABYLON.ArcRotateCamera(
      'Camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      new BABYLON.Vector3(0, 0, 5),
      scene
    );
    camera.attachControl(canvas, true);
    camera.setTarget(BABYLON.Vector3.Zero());

    //add some lights to the scene
    const light1 = new BABYLON.HemisphericLight(
      'light1',
      new BABYLON.Vector3(1, 1, 0),
      scene
    );
    const light2 = new BABYLON.PointLight(
      'light2',
      new BABYLON.Vector3(0, 1, 1),
      scene
    );
    light1.state = 'on';
    light2.state = 'on';
    light1.intensity = 0.7;
    light2.intensity = 0.5;
    const sphere = BABYLON.MeshBuilder.CreateSphere(
      'sphere',
      { diameter: 2 },
      scene
    );
    sphere.position.y = 1;
    const box = BABYLON.MeshBuilder.CreateBox(
      'box',
      { height: 2, width: 2, depth: 0.5 },
      scene
    );
    box.position.x = 2;
    box.position.y = 1;
    const ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

    // On pick interpolations
    var prepareButton = function(mesh, color, light) {
      var goToColorAction = new BABYLON.InterpolateValueAction(
        BABYLON.ActionManager.OnPickTrigger,
        light,
        'diffuse',
        color,
        1000,
        null,
        true
      );

      mesh.actionManager = new BABYLON.ActionManager(scene);
      mesh.actionManager
        .registerAction(
          new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPickTrigger,
            light,
            'diffuse',
            BABYLON.Color3.Black(),
            1000
          )
        )
        .then(
          new BABYLON.CombineAction(BABYLON.ActionManager.NothingTrigger, [
            // Then is used to add a child action used alternatively with the root action.
            goToColorAction, // First click: root action. Second click: child action. Third click: going back to root action and so on...
            new BABYLON.SetValueAction(
              BABYLON.ActionManager.NothingTrigger,
              mesh.material,
              'visibility',
              0.1,
              1000
            )
          ])
        );
      mesh.actionManager
        .registerAction(
          new BABYLON.SetValueAction(
            BABYLON.ActionManager.OnPickTrigger,
            mesh.material,
            'visibility',
            0.2,
            1000
          )
        )
        .then(new BABYLON.DoNothingAction());
      mesh.actionManager
        .registerAction(
          new BABYLON.SetStateAction(
            BABYLON.ActionManager.OnPickTrigger,
            light,
            'off'
          )
        )
        .then(
          new BABYLON.SetStateAction(
            BABYLON.ActionManager.OnPickTrigger,
            light,
            'on'
          )
        );
    };

    prepareButton(box, BABYLON.Color3.Red(), light1);
    prepareButton(sphere, BABYLON.Color3.Green(), light2);

    sphere.actionManager = new BABYLON.ActionManager(scene);
    const condition1 = new BABYLON.StateCondition(
      box.actionManager,
      light1,
      'off'
    );
    const condition2 = new BABYLON.StateCondition(
      sphere.actionManager,
      light1,
      'on'
    );
    box.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnLeftPickTrigger, camera, "alpha", 0, 500, condition1));
    sphere.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnLeftPickTrigger, camera, "alpha", Math.PI, 500, condition2));
    return scene;
  };

  // call the createScene function
  const scene = createScene();
  engine.runRenderLoop(() => {
    scene.render();
  });
});
