import { Query } from "express-serve-static-core";
import { IEntity } from "../../core/api/types/IEntity";
import { IEntityDetails } from "../../core/api/types/IEntityDetails";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { IEntityRepository } from "../../repositories/core/IEntityRepository";
import { Controller } from "./Controller";
import { SessionInterceptor } from "./SessionInterceptor";

export abstract class EntityController<
  TEntity extends IEntity,
  TEntityRepository extends IEntityRepository<TEntity>
> extends Controller {
  constructor(
    protected readonly routeMeta: IRouteMeta,
    protected readonly repo: TEntityRepository
  ) {
    super();
    this.deleteById();
    this.insert();
    this.findAll();
    this.findById();
    this.update();
  }

  protected deleteById() {
    this.router.delete(
      `${this.routeMeta}/:id`,
      SessionInterceptor((req, res) => {
        const id = req.params.id;
        const success = this.repo.deleteById(id);
        if (!success) {
          res.status(404).end();
        } else {
          res.status(204).end();
        }
      })
    );
  }

  protected findAll() {
    this.router.get(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const fields = this.getFieldsFromQuery(req.query);
        const entities = await this.repo.findAll(fields);
        res.status(200).send(entities);
      })
    );
  }

  protected findById() {
    this.router.get(
      `${this.routeMeta.path}/:id`,
      SessionInterceptor(async (req, res) => {
        const id = req.params.id;
        const fields = this.getFieldsFromQuery(req.query);
        const entity = await this.repo.findById(id, fields);
        if (entity) {
          res.status(200).send(entity);
        } else {
          res.status(404).end();
        }
      })
    );
  }

  protected insert() {
    this.router.post(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const entity: IEntityDetails<TEntity> = req.body;
        const fields = this.getFieldsFromQuery(req.query);
        const createdEntity = await this.repo.insert(entity, fields);
        res.status(201).send(createdEntity);
      })
    );
  }

  protected update() {
    this.router.put(
      `${this.routeMeta.path}/:id`,
      SessionInterceptor(async (req, res) => {
        const entity: TEntity = req.body;
        const fields = this.getFieldsFromQuery(req.query);
        const updatedEntity = await this.repo.update(entity, fields);
        res.status(200).send(updatedEntity);
      })
    );
  }

  protected updateAll() {
    this.router.put(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const entities: TEntity[] = req.body;
        const fields = this.getFieldsFromQuery(req.query);
        const updatedEntities = await this.repo.updateAll(entities, fields);
        res.status(200).send(updatedEntities);
      })
    );
  }

  /**
   * Returns the fields from the request *{@link query}* that are key fields of *{@link TEntity}*.
   */
  protected getFieldsFromQuery(query: Query): (keyof TEntity)[] {
    const fields = query.fields ? [String(query.fields).split(",")] : [];
    return fields as unknown as (keyof TEntity)[];
  }
}
