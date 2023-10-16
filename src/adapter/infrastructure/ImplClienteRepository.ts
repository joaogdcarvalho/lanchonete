import { Cliente } from "@/core/domain/cliente/Cliente";
import { ClienteRepository } from "@/core/domain/cliente/ClienteRepository";

export default class ImplClienteRepository implements ClienteRepository {
    save(_Cliente: Cliente): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(_Cliente: Cliente): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findByCpf(_id: string): Promise<Cliente> {
        throw new Error("Method not implemented.");
    }
}