import { Query } from "express-serve-static-core";
import { HttpStatusCode } from "../../core/api/types/HttpStatusCode";
import { IEntity } from "../../core/api/types/IEntity";
import { IEntityDetails } from "../../core/api/types/IEntityDetails";
import { IEntityRepository } from "../../core/api/types/IEntityRepository";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { AuthRole } from "../../shared/types/AuthRole";
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

  protected deleteById(authRoles?: AuthRole[]) {
    this.router.delete(
      `${this.routeMeta.path}/:id`,
      SessionInterceptor(async (req, res) => {
        const id = req.params.id;
        const success = await this.repo.deleteById(id);
        if (!success) {
          res.status(HttpStatusCode.NOT_FOUND_404).end();
        } else {
          res.status(HttpStatusCode.OK_200).send(true);
        }
      }, authRoles)
    );
  }

  protected findAll(authRoles?: AuthRole[]) {
    this.router.get(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const fields = this.getFieldsFromQuery(req.query);
        const entities = await this.repo.findAll(fields);
        return res.status(HttpStatusCode.OK_200).send(entities);
      }, authRoles)
    );
  }

  protected findById(authRoles?: AuthRole[]) {
    this.router.get(
      `${this.routeMeta.path}/:id`,
      SessionInterceptor(async (req, res) => {
        const id = req.params.id;
        const fields = this.getFieldsFromQuery(req.query);
        const entity = await this.repo.findById(id, fields);
        if (entity) {
          res.status(HttpStatusCode.OK_200).send(entity);
        } else {
          res.status(HttpStatusCode.NOT_FOUND_404).end();
        }
      }, authRoles)
    );
  }

  protected insert(authRoles?: AuthRole[]) {
    this.router.post(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const entity: IEntityDetails<TEntity> = req.body;
        const fields = this.getFieldsFromQuery(req.query);
        const createdEntity = await this.repo.insert(entity, fields);
        res.status(HttpStatusCode.CREATED_201).send(createdEntity);
      }, authRoles)
    );
  }

  protected update(authRoles?: AuthRole[]) {
    this.router.put(
      `${this.routeMeta.path}/:id`,
      SessionInterceptor(async (req, res) => {
        const entity: TEntity = req.body;
        const wasUpdated = await this.repo.update(entity);
        res.status(HttpStatusCode.OK_200).send(wasUpdated);
      }, authRoles)
    );
  }

  protected updateAll(authRoles?: AuthRole[]) {
    this.router.put(
      this.routeMeta.path,
      SessionInterceptor(async (req, res) => {
        const entities: TEntity[] = req.body;
        const fields = this.getFieldsFromQuery(req.query);
        const updatedEntities = await this.repo.updateAll(entities, fields);
        res.status(HttpStatusCode.OK_200).send(updatedEntities);
      }, authRoles)
    );
  }

  /**
   * Returns the fields from the request *{@link query}* that are key fields of *{@link TEntity}*.
   */
  protected getFieldsFromQuery(query: Query): (keyof TEntity)[] {
    const fields = query.fields ? String(query.fields).split(",") : [];
    return fields as unknown as (keyof TEntity)[];
  }
}
