import { expect } from "chai";
import { Service } from "../Service";
import { SP } from "../ServiceProvider";
import { ServiceInstanceType } from "../types/ServiceInstanceType";

describe("ServiceProvider", () => {
  describe("contains", () => {
    it("Returns false if a service was not set and not created and cached via fetch", () => {
      class UnknownService {}
      expect(SP.contains(UnknownService)).false;
    });

    it("Returns true if service was set by put", () => {
      class PutService {}
      SP.put(PutService, new PutService());
      expect(SP.contains(PutService)).true;
    });

    it("Returns true if service was created and cached via fetch", () => {
      class FetchedService {}
      SP.fetch(FetchedService);
      expect(SP.contains(FetchedService)).true;
    });
  });

  describe("fetch", () => {
    it("Returns created service", () => {
      class CreatedService {}
      const service = SP.fetch(CreatedService);
      expect(service).instanceOf(CreatedService);
    });

    it("Returns created singleton service", () => {
      class SingletonService {}
      expect(SP.fetch(SingletonService)).equal(SP.fetch(SingletonService));
    });

    it("Returns created multi instantiable service", () => {
      @Service({ serviceInstanceType: ServiceInstanceType.MULTI_INSTANTIABLE })
      class MultiInstantiableService {}
      expect(SP.fetch(MultiInstantiableService)).not.equal(
        SP.fetch(MultiInstantiableService)
      );
    });

    it("Returns service set by put", () => {
      class SetPutService {}
      const service = new SetPutService();
      SP.put(SetPutService, service);
      expect(SP.fetch(SetPutService)).equal(service);
    });
  });

  describe("put", () => {
    it("Puts a service that can be returned by fetch", () => {
      class SetPutService {}
      const service = new SetPutService();
      SP.put(SetPutService, service);
      expect(SP.fetch(SetPutService)).equal(service);
    });

    it("Puts a service instance which is not part of type of the given service type", () => {
      class MyService {
        print(): void {
          throw new Error("Method not implemented.");
        }
      }

      class AlternativeService {
        print(): void {
          throw new Error("Method not implemented.");
        }
      }

      SP.put(MyService, new AlternativeService());
      expect(SP.fetch(MyService)).instanceOf(AlternativeService);
      expect(SP.fetch(MyService)).not.instanceOf(MyService);
    });

    it("Puts a service instance with interface which is not part of type of the given service type", () => {
      interface IMyService {
        print(): void;
      }
      class MyServiceWithInterface implements IMyService {
        print(): void {
          throw new Error("Method not implemented.");
        }
        sayHello() {
          throw new Error("Method not implemented.");
        }
      }

      class AlternativeServiceWithInterface implements IMyService {
        print(): void {
          throw new Error("Method not implemented.");
        }
      }

      SP.put<IMyService>(
        MyServiceWithInterface,
        new AlternativeServiceWithInterface()
      );
      expect(SP.fetch(MyServiceWithInterface)).instanceOf(
        AlternativeServiceWithInterface
      );
      expect(SP.fetch(MyServiceWithInterface)).not.instanceOf(
        MyServiceWithInterface
      );
    });
  });
});
