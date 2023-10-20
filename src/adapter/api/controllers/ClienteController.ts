import ClienteRepository from "@/adapter/infrastructure/Repositories/ClienteRepository";
import { BuscaCliente } from "@/core/application/use-cases/cliente/BuscaCliente";
import { CriaCliente } from "@/core/application/use-cases/cliente/CriaCliente";
import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

class ClienteController {

	async criar(request: Request, response: Response, next: NextFunction) {
		try {
			const dados = request.body;

			const createBodySchema = z.object({
				nome: z.string().min(3).max(255),
				sobrenome: z.string().min(3).max(255).optional(),
				cpf: z.string().min(11).max(11),
			});

			const { nome, sobrenome, cpf } = createBodySchema.parse(dados);
			
			const clienteRepository = new ClienteRepository();
			const criarCliente = new CriaCliente(clienteRepository);

			await criarCliente.executarAsync({ nome, sobrenome, cpf });
		} catch (error) {
			next(error);
		}
	}

	async buscar(request: Request, response: Response, next: NextFunction) {
		try {
			const paramsSchema = z.object({
				cpf: z.string().min(11).max(11),
			});
		
			const { cpf } = paramsSchema.parse(request.params);
			
			const clienteRepository = new ClienteRepository();
			const buscarCliente = new BuscaCliente(clienteRepository);

			const cliente = await buscarCliente.executarAsync({ cpf });
			
			return response.status(200).json(cliente);
		} catch (error) {
			next(error);
		}
	}
}

export { ClienteController };

