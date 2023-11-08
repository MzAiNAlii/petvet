import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PetDocument } from './entities/pets-entity';
import { Model } from 'mongoose';
import { PetDto } from './dto/pet-dto';
import { amphibianSpecies, 
birdBreeds, 
catBreeds, 
chickenBreeds, 
dogBreeds,
duckBreeds, 
fishSpecies, 
goatBreeds, 
horseBreeds, 
pigBreeds, 
reptileSpecies, 
rodentSpecies, sheepBreeds } from './petBreesContants';
import { PetChatService } from 'src/petChat/petChat.service';


@Injectable()
export class PetService {
    constructor(@InjectModel('NestPet') private readonly petModel: Model<PetDocument>,
    @Inject(forwardRef(()=>PetChatService)) private readonly petChatService: PetChatService
   ){}

    async createPet(  petDto: PetDto){
        const {id,...rest}=petDto;
        const data= {...rest,userId:id}
        
        const petInfo = new this.petModel(data)
        await petInfo.save();
       
        return {
            message: "Pets created Successfull",
            data: petInfo
        }

    }

    async findAllPet(petDto : PetDto ){
        const {id} = petDto
        //console.log(id)
     
        const findPet = await this.petModel.find({userId:id})
        //console.log(findPet);
        
        if(!findPet){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }

        return {
            message: "Pets find Successfully",
            data: findPet
        }
    }

    async updatePet( id: string, petDto: PetDto){
         const {petName, petAge, petType,breed} = petDto;
        
        const findId =  await this.petModel.findById({_id:id})
        if(!findId.id ){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        const updatePetInfo = await this.petModel.findByIdAndUpdate(findId._id,{
            $set:{
                petName:petName,
                petAge: petAge,
                petType: petType,
                breed: breed,
                
            }
        },{new: true})
        

        return {
            message: "Update Successfully",
            status: true
        }
        
    }

    async deletePet(petDto: PetDto){
        const {id} = petDto;

        const findId = await this.petModel.findById({_id:id})
        if(!findId){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        const existingPetChat = await this.petChatService.find(id)
        if(existingPetChat){
          await this.petChatService.delete(id)
          await this.petModel.deleteOne(findId._id)

          return {
            message : "Pet Delete Successfully",
            status: true
        }

          }
        

        const deletePet = await this.petModel.deleteOne(findId._id)

        return {
            message : "Pet Delete Successfully",
            status: true
        }
    }

    async findPet(id: string){
      return await this.petModel.findById(id)


    }
    async searchBreed(petName: string, petBreed:string){
        
        if(petName == 'Dog'){
            dogBreeds
            if (!petBreed) {
                throw new BadRequestException('Pet breed parameter is required')
              }
              if(petBreed == 'All'){
                return {
                  partialMatches: dogBreeds
        
                }
              }
        
              const startingLetter = petBreed.charAt(0).toLowerCase();
              const autofillSuggestions = dogBreeds.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
              const partialMatches = dogBreeds.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
        
              return {
                petName,
                petBreed,
                autofillSuggestions,
                partialMatches,
        
              }
            }

        if(petName == 'Cat'){
            catBreeds
            if (!petBreed) {
                throw new BadRequestException('Pet breed parameter is required')
            }
            if(petBreed == 'All'){
                return {
                    partialMatches: catBreeds
            
                }
            }
            
            const startingLetter = petBreed.charAt(0).toLowerCase();
            const autofillSuggestions = catBreeds.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
            const partialMatches = catBreeds.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
            
            return {
                petName,
                petBreed,
                autofillSuggestions,
                partialMatches,
            
                }
            }

        if(petName == 'Bird'){
                    birdBreeds
                    if (!petBreed) {
                        throw new BadRequestException('Pet breed parameter is required')
                        }
                
                        if(petBreed == 'All'){
                          return {
                            partialMatches: birdBreeds
                  
                          }
                        }
                
                      const startingLetter = petBreed.charAt(0).toLowerCase();
                      const autofillSuggestions = birdBreeds.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
                      const partialMatches = birdBreeds.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
                
                      return {
                        petName,
                        petBreed,
                        autofillSuggestions,
                        partialMatches,
                
                      }
                }

        if(petName == 'Reptile'){
                    reptileSpecies
                    if (!petBreed) {
                        throw new BadRequestException('Pet breed parameter is required')
                      }
                      if(petBreed == 'All'){
                        return {
                          partialMatches: reptileSpecies
                
                        }
                      }
                
                      const startingLetter = petBreed.charAt(0).toLowerCase();
                      const autofillSuggestions = reptileSpecies.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
                      const partialMatches = reptileSpecies.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
                
                      return {
                        petName,
                        petBreed,
                        autofillSuggestions,
                        partialMatches,
                
                      }
                    }
        
        if(petName == 'Fish'){
                       fishSpecies
                        if (!petBreed) {
                            throw new BadRequestException('Pet breed parameter is required')
                          }
                          if(petBreed == 'All'){
                            return {
                              partialMatches: fishSpecies
                    
                            }
                          }
                    
                          const startingLetter = petBreed.charAt(0).toLowerCase();
                          const autofillSuggestions = fishSpecies.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
                          const partialMatches = fishSpecies.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
                    
                          return {
                            petName,
                            petBreed,
                            autofillSuggestions,
                            partialMatches,
                    
                          }
                        }
        
        if(petName == 'Rodent'){
                            rodentSpecies
                            if (!petBreed) {
                                throw new BadRequestException('Pet breed parameter is required')
                                }
                        
                                if(petBreed == 'All'){
                                  return {
                                    partialMatches: rodentSpecies
                          
                                  }
                                }
                        
                              const startingLetter = petBreed.charAt(0).toLowerCase();
                              const autofillSuggestions = rodentSpecies.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
                              const partialMatches = rodentSpecies.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
                        
                              return {
                                petName,
                                petBreed,
                                autofillSuggestions,
                                partialMatches,
                        
                              }
                        }

        if(petName == 'Horse'){
                            horseBreeds
                            if (!petBreed) {
                                throw new BadRequestException('Pet breed parameter is required')
                              }
                              if(petBreed == 'All'){
                                return {
                                  partialMatches: horseBreeds
                        
                                }
                              }
                        
                              const startingLetter = petBreed.charAt(0).toLowerCase();
                              const autofillSuggestions = horseBreeds.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
                              const partialMatches = horseBreeds.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
                        
                              return {
                                petName,
                                petBreed,
                                autofillSuggestions,
                                partialMatches,
                        
                              }
                            }
                
        if(petName == 'Amphibian'){
                               amphibianSpecies
                                if (!petBreed) {
                                    throw new BadRequestException('Pet breed parameter is required')
                                  }
                                  if(petBreed == 'All'){
                                    return {
                                      partialMatches: amphibianSpecies
                            
                                    }
                                  }
                            
                                  const startingLetter = petBreed.charAt(0).toLowerCase();
                                  const autofillSuggestions = amphibianSpecies.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
                                  const partialMatches = amphibianSpecies.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
                            
                                  return {
                                    petName,
                                    petBreed,
                                    autofillSuggestions,
                                    partialMatches,
                            
                                  }
                                }
                
        if(petName == 'Chicken'){
                                    chickenBreeds
                                    if (!petBreed) {
                                        throw new BadRequestException('Pet breed parameter is required')
                                        }
                                
                                        if(petBreed == 'All'){
                                          return {
                                            partialMatches: chickenBreeds
                                  
                                          }
                                        }
                                
                                      const startingLetter = petBreed.charAt(0).toLowerCase();
                                      const autofillSuggestions = chickenBreeds.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
                                      const partialMatches = chickenBreeds.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
                                
                                      return {
                                        petName,
                                        petBreed,
                                        autofillSuggestions,
                                        partialMatches,
                                
                                      }
                                }
                
        if(petName == 'Duck'){
                                    duckBreeds
                                    if (!petBreed) {
                                        throw new BadRequestException('Pet breed parameter is required')
                                      }
                                      if(petBreed == 'All'){
                                        return {
                                          partialMatches: duckBreeds
                                
                                        }
                                      }
                                
                                      const startingLetter = petBreed.charAt(0).toLowerCase();
                                      const autofillSuggestions = duckBreeds.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
                                      const partialMatches = duckBreeds.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
                                
                                      return {
                                        petName,
                                        petBreed,
                                        autofillSuggestions,
                                        partialMatches,
                                
                                      }
                                    }
                        
        if(petName == 'Goat'){
                                       goatBreeds
                                        if (!petBreed) {
                                            throw new BadRequestException('Pet breed parameter is required')
                                          }
                                          if(petBreed == 'All'){
                                            return {
                                              partialMatches: goatBreeds
                                    
                                            }
                                          }
                                    
                                          const startingLetter = petBreed.charAt(0).toLowerCase();
                                          const autofillSuggestions = goatBreeds.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
                                          const partialMatches = goatBreeds.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
                                    
                                          return {
                                            petName,
                                            petBreed,
                                            autofillSuggestions,
                                            partialMatches,
                                    
                                          }
                                        }
                        
        if(petName == 'Sheep'){
                                            sheepBreeds
                                            if (!petBreed) {
                                                throw new BadRequestException('Pet breed parameter is required')
                                                }
                                        
                                                if(petBreed == 'All'){
                                                  return {
                                                    partialMatches: sheepBreeds
                                          
                                                  }
                                                }
                                        
                                              const startingLetter = petBreed.charAt(0).toLowerCase();
                                              const autofillSuggestions = sheepBreeds.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
                                              const partialMatches = sheepBreeds.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
                                        
                                              return {
                                                petName,
                                                petBreed,
                                                autofillSuggestions,
                                                partialMatches,
                                        
                                              }
                                        }
        if(petName == 'Pig'){
            pigBreeds
                                            if (!petBreed) {
                                                throw new BadRequestException('Pet breed parameter is required')
                                                }
                                        
                                                if(petBreed == 'All'){
                                                  return {
                                                    partialMatches: pigBreeds
                                          
                                                  }
                                                }
                                        
                                              const startingLetter = petBreed.charAt(0).toLowerCase();
                                              const autofillSuggestions = pigBreeds.filter((breed: any) => breed.toLowerCase().startsWith(startingLetter));
                                              const partialMatches = pigBreeds.filter((breed: any) => breed.toLowerCase().includes(petBreed.toLowerCase()));
                                        
                                              return {
                                                petName,
                                                petBreed,
                                                autofillSuggestions,
                                                partialMatches,
                                        
                                              }
                                        }
                    

        }


    }
