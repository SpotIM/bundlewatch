<div align="center">
  <a href="http://bundlewatch.io">
    <img src="https://cdn.rawgit.com/bundlewatch/bundlewatch.io/master/docs/_assets/logo-large.svg" height="100px">
  </a>
  <br>
  <br>


  <h1>BundleWatch</h1>
  <p>
    BundleWatch checks file sizes, ensuring bundled browser assets don't jump in file size. <br />
    Sharp increases in BundleWatch can signal that something is wrong - adding a package that bloats the slug, a wrong import, or forgetting to minify.
  </p>
</div>


<h3>Add BundleWatch to your project</h3>

1. yarn add @spotim/bundlewatch
2. add a `bundlewatch.json` to your project with the names of your bundles and their max sizes, and an optionally reporting service (currently only supports grafana), example:

    ```5.
    {
    "files": [
        {
            "path": "./dist/launcher/launcher-bundle.js",
            "maxSize": "70 KB"
          },
          {
            "path": "./dist/vendor/vendor-bundle.js",
            "maxSize": "132 KB"
          }
    ],
    "reporter": ["grafana"]
    }
    

3. add a script in package.json that will run bundlewatch from your bundlewatch.json:

```
     ...
     "bundlewatch": "bundlewatch --config bundlewatch.json"
     ...
```

4. update your circleCI build config (config.yml). The script must run after the building of the production assets, example: 

```
      - run:
          name: Build Production Assets
          command: PUBLIC_PATH=https://static-cdn.spot.im/production/conversation/tags/${CIRCLE_TAG}/ yarn run build:circleci
      - run:
          name: Check bundle size
          command: yarn run bundlewatch
```

5. PROFIT

Projects that use bundlewatch for references: Launcher, Conversation
