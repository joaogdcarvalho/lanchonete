import { BuscaClienteFactory } from "@/core/application/use-cases-factories/cliente/BuscaClienteFactory";
import { CriaClienteFactory } from "@/core/application/use-cases-factories/cliente/CriaClienteFactory";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

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

			const criarCliente = CriaClienteFactory();
			await criarCliente.executarAsync({ nome, sobrenome, cpf });

			return response.status(201).send();
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

			const buscarCliente = BuscaClienteFactory();
			const { cliente } = await buscarCliente.executarAsync({ cpf });

			return response.status(200).json(cliente);
		} catch (error) {
			next(error);
		}
	}
}

export { ClienteController };
