import RenderedInstance from './RenderedInstance';
import PIXI from 'pixi.js';
const gd = global.gd;

/**
 * Renderer for gd.TiledSpriteObject
 *
 * @extends RenderedInstance
 * @class RenderedTiledSpriteInstance
 * @constructor
 */
function RenderedTiledSpriteInstance(
  project,
  layout,
  instance,
  associatedObject,
  pixiContainer,
  resourcesLoader
) {
  RenderedInstance.call(
    this,
    project,
    layout,
    instance,
    associatedObject,
    pixiContainer
  );

  //Setup the PIXI object:
  var tiledSprite = gd.asTiledSpriteObject(associatedObject);
  this._pixiObject = new PIXI.extras.TilingSprite(
    resourcesLoader.getPIXITexture(project, tiledSprite.getTexture()),
    tiledSprite.getWidth(),
    tiledSprite.getHeight()
  );
  this._pixiObject.anchor.x = 0.5;
  this._pixiObject.anchor.y = 0.5;
  this._pixiContainer.addChild(this._pixiObject);
}
RenderedTiledSpriteInstance.prototype = Object.create(
  RenderedInstance.prototype
);

/**
 * Return a URL for thumbnail of the specified object.
 * @method getThumbnail
 * @static
 */
RenderedTiledSpriteInstance.getThumbnail = function(
  project,
  resourcesLoader,
  object
) {
  var tiledSprite = gd.asTiledSpriteObject(object);

  return resourcesLoader.getFilename(project, tiledSprite.getTexture());
};

RenderedTiledSpriteInstance.prototype.update = function() {
  if (this._instance.hasCustomSize()) {
    this._pixiObject.width = this._instance.getCustomWidth();
    this._pixiObject.height = this._instance.getCustomHeight();
  } else {
    var tiledSprite = gd.asTiledSpriteObject(this._associatedObject);
    this._pixiObject.width = tiledSprite.getWidth();
    this._pixiObject.height = tiledSprite.getHeight();
  }

  this._pixiObject.x = this._instance.getX() + this._pixiObject.width / 2;
  this._pixiObject.y = this._instance.getY() + this._pixiObject.height / 2;
  this._pixiObject.rotation = RenderedInstance.toRad(this._instance.getAngle());
};

RenderedTiledSpriteInstance.prototype.getDefaultWidth = function() {
  var tiledSprite = gd.asTiledSpriteObject(this._associatedObject);
  return tiledSprite.getWidth();
};

RenderedTiledSpriteInstance.prototype.getDefaultHeight = function() {
  var tiledSprite = gd.asTiledSpriteObject(this._associatedObject);
  return tiledSprite.getHeight();
};

export default RenderedTiledSpriteInstance;
