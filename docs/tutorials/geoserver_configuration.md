**Vector Tile Configuration Skærmkort**

Procedure for setting up layer as vector tile:

**NB! Make sure that the vector tile plugin for GeoServer is
installed. (version 2.25.3)**

**Workspace and Data store**

1.  Under the Data section, press Workspaces and add a new Workspace
    with an appropriate name. Create a workspace for each scale.

> ![image1](https://github.com/user-attachments/assets/05229791-e388-4a95-aa7e-5ea2cb402351)
> ![image2](https://github.com/user-attachments/assets/a83510a2-51fc-4186-b937-3f6e4b37bc4e)

2.  Under the Data section, press Stores and create a new Store (PostGIS
    Database) associated with the Workspace created above.

> ![image3](https://github.com/user-attachments/assets/4665535f-3e91-4029-a750-8b60927fd801)
> ![image4](https://github.com/user-attachments/assets/e483fd34-0b50-48cb-9b58-a7c7048f282b)

3.  Under workspace drop down chose workspace created in step 1 and fill
    in the marked fields with your data. (see example 1)

4.  Press Save

5.  Create a Store for each scale as a connection to the PostGIS database.

> Example 1
>
> ![BasicStore](https://github.com/user-attachments/assets/64ea2711-71bd-45aa-9a4c-16c95a4e47f6)


Gridset
-------

1.  Under the Tile Cashing section, press Gridsets and create a new
    gridset

> ![image6](https://github.com/user-attachments/assets/76dc7536-7e3c-4f09-af63-01ab13eb354f)
2.  Give the gridset a name e.g. EPSG:25832 (see example 2)

3.  Press the Find button under Coordinate Reference System and
    choose 25832 ETRS89 / UTM zone 32N. (see example 2)

4.  In gridset bounds, type this extent: (see example 2)

    -   139000

    -   5661139.2

    -   977860.8

    -   6500000

5.  Press Add zoom level an appropriate amount of times (e.g. 16 times).
    (see example 2)

> Example 2
>
> ![CreateGridset](https://github.com/user-attachments/assets/da9010cb-cff9-4a6e-a3b8-41131dc5199e)
6.  Press Save when your setup looks kinda similar to this:
> ![2024-12-06_13-26-31](https://github.com/user-attachments/assets/ccd4aebd-54ea-4d51-943e-1d219155834d)

7. To create a webmercator gridset (EPSG:3857) search for WebMercatorQuad under Gridsets and press the button "Create a copy"

8. Name it EPSG:3857 and add "EPSG:3857:" before each zoom level in the column Name so it look like the screendump below:
> ![Oversigt_over_TilesMatrixSet](https://github.com/user-attachments/assets/aa2884c1-0095-43c1-9356-d64960a2a643)

9.  Under the Tile Cashing section, press Caching Defaults 

> ![image9](https://github.com/user-attachments/assets/d17e686c-d390-4f42-b30f-c165f5db2d86)
10.  Check the application/vnd.mapbox-vector-tile checkbox.

> ![image10](https://github.com/user-attachments/assets/fa6659bd-467b-4e85-8c6c-e9b152da5e19)
11.  Press the \"Add default gridset\" drop-down and select the gridset you created in the steps above then it will be added to the list
> ![2024-12-06_13-37-31](https://github.com/user-attachments/assets/6c1183d2-806b-4a33-8e83-a5393074bff1)

    
12. Press Save

**Styles**

We only use the style to filter (aka show/hide) tables in different
scales. We do not actually style the map in geoserver.

1.  Under Data section press Styles and add a new style

> ![image12](https://github.com/user-attachments/assets/03a1d274-ce14-4a8b-94bd-d5e3271d19e7)
> ![image13](https://github.com/user-attachments/assets/abbb2482-a646-4e10-985e-31bf166d59d7)
2.  Give the style a name e.g.Name: scale\_100 (see example 3)

3.  Under Format drop down chose: CSS (see example 3)

4.  Type the actual style (in the big text-field) (see example 3)
```css
[@wms_srs = 'EPSG:25832'] [@sd < 20k] [@sd > 8k] {
    stroke: #000000;
}

[@wms_srs = 'EPSG:3857'] [@sd < 40k] [@sd > 20k] {
    stroke: #000000;
}
```
5.  Press Validate (should not give an error)

6.  Press Save

> Example 3:
>
> ![Style](https://github.com/user-attachments/assets/09d15624-8c7a-4b77-b271-be8d5897a16f)

7.  Publishing created style: doubleClick on the style you created in
    step 2.

8.  Under Publishing menu, check the default checkbox on all the layers,
    that match this scale. (in this case, all the layers that have a
    suffix of s100)

9.  press Save

> ![image15](https://github.com/user-attachments/assets/8809e889-895a-49f5-a369-169948b7cec3)
10. Repeat with scales such as 10, 50, 100, 500, 1000 or whatever you
    feel like. But this should match up with what scales you have in the
    layers that you added previously.

**Layers**

Feature types are selected from the table in the database to be
displayed in vector tiles. If it fails, it must be added to the database
view. (Ask the administrator of the management database).

1.  Under Data section press Layers and add a new layer

> ![image16](https://github.com/user-attachments/assets/5b18cb43-1aac-4025-8929-7d4a41a2c3d9)
> ![image17](https://github.com/user-attachments/assets/b9f72e65-f82f-4187-98e1-d6d87ab2dca0)
2.  Choose data source created in section Workspace and Data Stores,
    step 2.

![image18](https://github.com/user-attachments/assets/272e6389-47d7-4990-bd71-b787622965c3)

3.  Find the layer name you want to publish and press publish

> ![image19](https://github.com/user-attachments/assets/3e1e3903-3157-49e6-b25a-2c63dea54672)

4.  Under Data tab sheet, choose the right Coordinate Reference System
    \-- e.g. epsg:25832. (see example 4)

5.  Under Bounding Boxes press Compute from data and Compute from native
    bounds. (see example 4)

> example 4
>
> ![image20](https://github.com/user-attachments/assets/39121eda-813c-4814-a47a-a3fa5a00d4e1)
> ![image21](https://github.com/user-attachments/assets/806b572c-778e-44c3-9e04-fbc28b5f845f)
6.  Press Save

7.  Under the tab sheet Publishing, WMS settings, Default style dropdown
    menu, choose the corresponding style file to the scale.

> ![image22](https://github.com/user-attachments/assets/ba0660bd-fa81-46e0-977d-98f632f8a296)

You can preview the data under the Tile Caching section press Tile
Layers. In the Preview drop-down select the pbf option corresponding to
the layer created above and the gridset created in section Gridset step
1-6:

![image23](https://github.com/user-attachments/assets/fc57059a-7fdc-4395-bc9b-5f1c84a38cb6)
**Layer group**

1.  Under Data section press Layer Groups and add a new layer group

> ![image24](https://github.com/user-attachments/assets/309cc167-d556-471f-ba76-6d601527ece8)
> ![image25](https://github.com/user-attachments/assets/b5f693df-4502-4ad8-903c-5b27cc7e410b)

2.  Give the layer group a name e.g. skaermkort\_vector\_tiles (See
    example 5)

3.  Workspace: do NOT choose a workspace. (See example 5)

4.  In bounds, type this extent: (See example 5)

-   120000

-   5900000

-   1000000

-   6500000

5.  Press the Find button under Coordinate Reference System and
    choose 25832 ETRS89 / UTM zone 32N. (see example 5)

Examle 5:

![2024-12-06_13-42-00](https://github.com/user-attachments/assets/17f5c87c-f625-4552-b4cc-382cece709be)

6.  Add layer, add all the layers per Name for all the scales, one at
    the time by name. Tip: search by name.

> ![image27](https://github.com/user-attachments/assets/6f2eb07a-a893-4f34-b81e-114ee1d4930e)
-   NB! the top layer is at the bottom of the map. So, add all the
    layers in the order from bottom to top. (generally, polygons at the
    bottom, then lines, then points)

    -   vand

    -   natur

    -   bebygget

    -   industri

    -   infrastruktur

    -   vandloeb

    -   jernbane

    -   veje

    -   graenser

    -   punkter

7.  Press Save

8.  *Under the tab sheet Tile Caching* check the checkbox
    with application/vnd.mapbox-vector-tile

> ![image28](https://github.com/user-attachments/assets/106301a8-87b4-43f0-9343-aac6819a4736)

9.  Press Save

Test it out by going to **Tile Caching \> Tile layers**. Find your layer
group, and the press Select One, and choose the one with pbf-format in
your CRS (eg. epsg\_25832).

**NB** Do not place layer groups inside a Workspace.
